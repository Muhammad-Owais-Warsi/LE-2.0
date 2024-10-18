import DashboardPersonal from "./dashboard_personal";
import DashboardPhoto from "./dashboard_photo";

export default function DashboardPage() {
    return (
        <div className="flex flex-col md:flex-row lg:flex-row gap-10 items-center ml-10 ">
            <div>
                <DashboardPersonal />
            </div>
            <div>
                <DashboardPhoto />
            </div>
        </div>
    );
}
