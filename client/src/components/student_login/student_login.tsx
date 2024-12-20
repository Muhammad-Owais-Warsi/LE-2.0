import StudentLoginCard from "./student_login_card";

export default function StudentLogin() {
  return (
    <div className="flex flex-col justify-center items-center space-y-6 rounded-sm">

      <div>
        <img src="https://sp.srmist.edu.in/srmiststudentportal/resources/Image/srmist.jpg" alt="srm-logo" className="w-40 h-auto lg:scale-150 mt-7" />
      </div>


      <div className="flex flex-col md:flex-row justify-center items-start md:items-center space-x-0 md:space-x-10 space-y-6 md:space-y-0 p-4 max-w-5xl gap-10">

        <div className="text-left max-w-md text-sm md:text-base relative bottom-10">
          <p className="mb-4">
            <strong>Dear Student,</strong>
          </p>
          <p className="mb-4">
            Welcome to the SRMIST Leave Application Portal. You can access this portal to apply for leave, track your application status, and view past requests.
          </p>
          <p className="mb-4">
            SRMIST students can log in using their credentials. (i.e., Your college email id <strong>abcd@srmist.edu.in</strong> & your password.)
          </p>
        </div>


        <div>
          <StudentLoginCard />
        </div>
      </div>
    </div>
  );
}
