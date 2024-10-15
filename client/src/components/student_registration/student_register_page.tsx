import LogoutButton from "../logout/logout";
import StudentRegisterForm from "./student_register_form";

export default function StudentRegisterPage() {
    return (
        <div className="min-h-screen flex flex-col items-center">
            <div className="w-full flex justify-between">
                <div className="ml-4 mt-4">
                    <LogoutButton />
                </div>
            </div>
            <h1 className="text-3xl font-bold text-center mb-8">Student Registration</h1>
            <StudentRegisterForm />
        </div>
    );
}
