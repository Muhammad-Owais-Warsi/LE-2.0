import Logout from "../../icons/logout"

export default function LogoutButton() {
    return (
        <div className="mb-7">
            <button className="rounded-xl flex-col bg-gray-100 hover:bg-gray-300 w-15 h-13 flex justify-center items-center">
                <Logout className="w-6 h-6" />
                <span>Logout</span>
            </button>
        </div>
    )
}