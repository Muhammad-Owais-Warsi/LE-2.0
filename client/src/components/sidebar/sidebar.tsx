import { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Hamburger from '../../icons/hamburger';
import Close from '../../icons/close';
import { SidebarContext } from '../../context/sidebar_context';
import Dashboard from '../../icons/dashboard';
import Leave from '../../icons/leave';
import Status from '../../icons/status';
import Folder from '../../icons/folder';
import LogoutButton from '../logout/logout';

export default function Sidebar() {
    const { SidebarIsOpen, setSidebarIsOpen } = useContext(SidebarContext);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleSidebar = () => {
        setSidebarIsOpen(!SidebarIsOpen);
    };

    const isActive = (path: string) => {
        return location.pathname === path ? 'text-black' : 'text-[rgb(51,122,183)]';
    };

    const handleNavigate = (path: string) => {
        navigate(path);
    };

    // Automatically handle sidebar state on different screen sizes
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setSidebarIsOpen(true);
            } else {
                setSidebarIsOpen(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [setSidebarIsOpen]);

    return (
        <div className="flex h-screen">
     
            <button
                className={`fixed top-4 left-5 p-4 rounded-2xl z-20 hover:bg-slate-200 ${SidebarIsOpen ? 'hidden' : 'block'}`}
                onClick={toggleSidebar}
            >
                <Hamburger className="w-5 h-5" />
            </button>

    
            <button
                className={`fixed top-1 left-[0.6rem] rounded-2xl z-40 hover:bg-slate-200 p-4 ${SidebarIsOpen ? 'block' : 'hidden'}`}
                onClick={toggleSidebar}
            >
                <Close className="w-5 h-5" />
            </button>

     
            <aside
                className={`fixed inset-y-0 left-0 w-64 bg-white border-r-2 border-gray-300 shadow-lg transition-transform duration-300 ease-in-out z-30
                ${SidebarIsOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="h-full p-4 flex flex-col relative top-7">
                    <ul className="mt-8 ml-2">
                        <li className="mb-4 flex justify-start items-center gap-4">
                            <Dashboard className="w-6 h-6" />
                            <button
                                onClick={() => handleNavigate('/dashboard')}
                                className={`${isActive('/dashboard')} hover:text-black`}
                            >
                                Dashboard
                            </button>
                        </li>
                        <li className="mb-4 flex justify-start items-center gap-4">
                            <Leave className="w-5 h-5" />
                            <button
                                onClick={() => handleNavigate('/leave-application')}
                                className={`${isActive('/leave-application')} hover:text-black`}
                            >
                                Take Leave
                            </button>
                        </li>
                        <li className="mb-4 flex justify-start items-center gap-4">
                            <Status className="w-5 h-5" />
                            <button
                                onClick={() => handleNavigate('/status')}
                                className={`${isActive('/status')} hover:text-black`}
                            >
                                Leave Status
                            </button>
                        </li>
                        <li className="mb-4 flex justify-start items-center gap-4">
                            <Folder className="w-5 h-5" />
                            <button
                                onClick={() => handleNavigate('/course-list')}
                                className={`${isActive('/course-list')} hover:text-black`}
                            >
                                Past Applications
                            </button>
                        </li>
                        <li className="mb-4 flex justify-start items-center gap-4">
                            <LogoutButton />
                        </li>
                    </ul>
                </div>
            </aside>


            <div className={`flex-1 p-4 transition-all duration-300 ${SidebarIsOpen ? 'md:ml-64' : 'ml-0'}`}/>


        </div>
    );
}
