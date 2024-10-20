const { SupabaseClient, createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

if (supabase) {
    console.log("Connected to Supabase");
}


module.exports = supabase;