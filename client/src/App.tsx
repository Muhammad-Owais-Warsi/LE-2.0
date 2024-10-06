import { BrowserRouter,Routes,Route } from "react-router-dom";
import StudentLogin from "./components/student_login/student_login";
import LeaveApplicationPage from "./components/leave_form/leave_application_page";

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LeaveApplicationPage/>}/>
        </Routes>
      </BrowserRouter>
  );
}
