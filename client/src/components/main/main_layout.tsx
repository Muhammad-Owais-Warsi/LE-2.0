import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from '../sidebar/sidebar';
import { SidebarContext } from '../../context/sidebar_context';


// Made this component to segregate components b/w the one who needs sidebar and one who doesn't
const MainLayout = () => {
    const [SidebarIsOpen, setSidebarIsOpen] = useState<boolean>(true);

    return (
        <SidebarContext.Provider value={{ SidebarIsOpen, setSidebarIsOpen }}>
            <div className="flex h-screen gap-15"> 
                <Sidebar />
                <main className="flex-1 p-4 overflow-auto"> 
                    <Outlet /> 
                </main>
            </div>
        </SidebarContext.Provider>
    );
};

export default MainLayout;
