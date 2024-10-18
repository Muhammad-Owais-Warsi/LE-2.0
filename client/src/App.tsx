import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentLogin from "./components/student_login/student_login";
import MainLayout from "./components/main/main_layout";
import LeaveApplicationPage from "./components/leave_form/leave_application_page";
import StudentRegisterPage from "./components/student_registration/student_register_page";
import DashboardPage from "./components/dashboard/dashboard_page";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* They don't need sidebar */}
        <Route path="/" element={<StudentLogin />} />
        <Route path="/register" element={<StudentRegisterPage />} />


        {/* These routes needs sidebar */}
        <Route element={<MainLayout />}>
          <Route path="/leave-application" element={<LeaveApplicationPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
