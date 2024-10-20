const express = require("express");
const multer = require("multer");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const cookieParser = require("cookie-parser");
const supabase = require("./db_connection");

const app = express();
const port = 8000;

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.post("/register", async (req, res) => {
  const { email, password, roll_number, department, section, name } = req.body;

  try {
    const { data: users, error: userError } = await supabase
      .from("users")
      .select("email")
      .eq("email", email);

    if (users.length > 0) {
      return res.status(400).json({ error: "User already exists with this email." });
    }

    // Hash the password and create the new user
    const hashedPassword = await bcrypt.hash(password, 10);

    const { data: insertedUser, error: insertError } = await supabase
      .from("users")
      .insert([{ email, password: hashedPassword, roll_number, department, section, name }])
      .select("user_id")
      .single();

    if (insertError) {
      return res.status(500).json({ error: "Error registering new user." });
    }

    return res.status(200).json({ message: "User registered successfully", user_id: insertedUser.user_id });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Server error." });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    //  if the user exists
    const { data: users, error: userError } = await supabase
      .from("users")
      .select("user_id, password")
      .eq("email", email)
      .single();

    if (userError || !users) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    // Validate the user's password
    const userExists = users;
    const passwordValidity = await bcrypt.compare(password, userExists.password);

    if (!passwordValidity) {
      return res.status(400).json({ error: "Invalid password." });
    }

    //  if the session exists
    const { data: existingSession, error: sessionError } = await supabase
      .from("session")
      .select("session_id, expires_at")
      .eq("user_id", userExists.user_id)
      .single();

    if (sessionError && sessionError.code !== 'PGRST116') {
      return res.status(500).json({ message: "Error checking session." });
    }

    if (existingSession && new Date(existingSession.expires_at) > new Date()) {
      // Session exists and is still valid, extend expiration time
      await createOrUpdateSession(userExists.user_id, existingSession.session_id, res);
      return res.status(200).json({ message: "Session extended", sessionId: existingSession.session_id });
    }

    // If no session or expired session, create a new one
    const newSessionId = uuidv4();
    await createOrUpdateSession(userExists.user_id, newSessionId, res);
    return res.status(200).json({ message: "Logged in successfully", sessionId: newSessionId });

  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Server error." });
  }
});

// Helper function to update or create session
async function createOrUpdateSession(userId, sessionId, res) {
  const expiresAt = new Date(Date.now() + 1000 * 60 * 2); // 2 minutes expiry

  const { error } = await supabase
    .from("session")
    .upsert({
      session_id: sessionId,
      user_id: userId,
      created_at: new Date(),
      expires_at: expiresAt,
    }, { onConflict: ['user_id'] });

  if (error) {
    console.error("Supabase session error:", error.message || error);
    throw new Error("Error creating/updating session");
  }

  // Set the session in the cookie
  res.cookie("sessionId", sessionId, {
    httpOnly: true,
    maxAge: 1000 * 60 * 2, // 2 minutes expiry for the cookie as well
  });
}


// test middleware -> not final

const authenticate = async (req, res, next) => {
  const sessionId = req.cookies.sessionId;

  if (!sessionId) {
    return res.status(401).json({ error: "unauthorized" });
  }

  try {
    const { data: sessionData, error } = await supabase
    .from("session")
    .select("user_id, expires_at")
    .eq("session_id", sessionId)
    .single();

    if (error || !sessionData) {
      return res
        .status(401)
        .json({ message: "error session validation, login again" });
    }

    // if (new Date(sessionData.expires_at) < new Date()) {
    //   return res.status(401).json({error: "session expired, log in again"})
    // }

    const {data: user, error: userError} = await supabase
    .from("users")
    .select("user_id, email, name")
    .eq("user_id", sessionData.user_id)
    .single();

    if (userError || !user) {
      return res.status(401).json({error: "User not found, log in again"})
    }

    req.user = user;
    next();
  }
  catch(err) {
    console.error("server error", err.message || err);
    return res.status(500).json({message: "server error, try again, check 204"})
  }
};

// session testing route

app.get("/profile", authenticate, (req, res) => {
  res.status(200).json({ message: `Welcome ${req.user.email}!` });
});

app.post("/form", authenticate, upload.array("images", 2), async (req, res) => {
  try {
    const data = req.body;
    const { files } = req;

    // Check for required fields
    const requiredFields = [
      "name",
      "email",
      "reg_no",
      "stud_ph_no",
      "parent_ph_no",
      "hostel_name",
      "room_no",
      "date_out",
      "date_in",
      "time_in",
      "time_out",
      "reason",
      "college_name",
      "department",
      "section",
    ];

    for (const field of requiredFields) {
      if (!data[field]) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }

    console.log(files);
    if (files.length < 2) {
      return res.status(400).json({ error: "Both images are required" });
    }

    // Upload profile image
    const profileImageName = `${Date.now()}_${files[0].originalname}`;
    const { data: profileUpload, error: profileError } = await supabase.storage
      .from("imageANDproofs")
      .upload(profileImageName, files[0].buffer, {
        contentType: files[0].mimetype,
      });

    if (profileError) {
      console.log("Supabase storage error (profile):", profileError);
      return res.status(400).json({ error: profileError.message });
    }

    // Upload proof image
    const proofImageName = `${Date.now()}_${files[1].originalname}`;
    const { data: proofUpload, error: proofError } = await supabase.storage
      .from("imageANDproofs")
      .upload(proofImageName, files[1].buffer, {
        contentType: files[1].mimetype,
      });

    if (proofError) {
      console.log("Supabase storage error (proof):", proofError);
      return res.status(400).json({ error: proofError.message });
    }

    // Get bucket image URLs
    const user_profile_url = supabase.storage
      .from("imageANDproofs")
      .getPublicUrl(profileImageName).data.publicUrl;
    const proof_url = supabase.storage
      .from("imageANDproofs")
      .getPublicUrl(proofImageName).data.publicUrl;

    // Insert data into the database
    const { data: insertData, error: insertError } = await supabase
      .from("forms")
      .insert([
        {
          name: data.name,
          email: data.email,
          reg_no: data.reg_no,
          stud_ph_no: data.stud_ph_no,
          parent_ph_no: data.parent_ph_no,
          hostel_name: data.hostel_name,
          room_no: data.room_no,
          date_out: data.date_out,
          date_in: data.date_in,
          time_in: data.time_in,
          time_out: data.time_out,
          reason: data.reason,
          college_name: data.college_name,
          department: data.department,
          section: data.section,
          user_profile_url: user_profile_url,
          proof_url: proof_url,
        },
      ]);

    if (insertError) {
      console.error("Supabase error:", insertError);
      return res.status(400).json({ error: insertError.message });
    }

    res
      .status(200)
      .json({ message: "Data inserted successfully", data: insertData });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
