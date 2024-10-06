import { createContext, Dispatch,SetStateAction } from "react";

type ApplicationTypeContextType = {
    applicationType:string;
    setApplicationType:Dispatch<SetStateAction<string>>
}

export const ApplicationTypeContext = createContext<ApplicationTypeContextType>({
    applicationType: "",
    setApplicationType: () => {},
  });
  
