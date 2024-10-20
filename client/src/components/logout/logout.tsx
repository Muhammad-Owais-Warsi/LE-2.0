import Logout from "../../icons/logout"

export default function LogoutButton() {
    return (
        <div>
            <button className="rounded-lg gap-3 h-10 w-[12rem] bg-gray-200 hover:bg-gray-300 flex justify-center items-center px-4 py-2">
                <Logout className="w-5 h-5" />
                <span className="text-sm font-medium">Logout</span>
            </button>
        </div>
    )
}
