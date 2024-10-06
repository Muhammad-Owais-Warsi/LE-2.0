import { Select, SelectItem } from "@nextui-org/react";
import { useContext } from "react";
import { ApplicationTypeContext } from "../../context/application_type";

export default function SelectType() {

  const {setApplicationType} = useContext(ApplicationTypeContext);

  const handleSetApplicationType = (event:any) => {
    setApplicationType(event.target.value);
  }

  return (
    <div className="flex justify-center items-start gap-4">

      <div className="flex-grow">
        <Select color="primary" isRequired className="w-max-xs md:w-[20rem] " placeholder="Select" label="Application Type" labelPlacement="outside" onChange={handleSetApplicationType}>
          <SelectItem key={"OD"}>OD</SelectItem>
          <SelectItem key={"MARRIAGE"}>MARRIAGE</SelectItem>
          <SelectItem key={"EMERGENCY"}>Emergency</SelectItem>
          <SelectItem key={"SEM BREAK"}>Sem Break</SelectItem>
        </Select>
      </div>
    </div>
  );
}
