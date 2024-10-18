import { createContext, Dispatch,SetStateAction } from "react";

type SidebarContextType = {
    SidebarIsOpen:boolean;
    setSidebarIsOpen:Dispatch<SetStateAction<boolean>>;
}


export const SidebarContext = createContext<SidebarContextType>({
    SidebarIsOpen:false,
    setSidebarIsOpen:() => {},
})