import { BrowserRouter,Routes,Route } from "react-router-dom";
import StudentLogin from "./components/student_login/student_login";
import LeaveApplicationPage from "./components/leave_form/leave_application_page";
import StudentRegisterPage from "./components/student_registration/student_register_page";

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StudentLogin/>}/>
          <Route path="/leave-application" element={<LeaveApplicationPage/>}/>
          <Route path="/register" element={<StudentRegisterPage/>}/>
        </Routes>
      </BrowserRouter>
  );
}
