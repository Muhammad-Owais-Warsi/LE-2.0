import { ApplicationTypeContext } from "../../context/application_type"
import DisclaimerCard from "./disclaimer_card"
import LeaveApplicationForm from "./leave_form"
import { useMemo, useState } from "react"
import SelectType from "./select_type"



export default function LeaveApplicationPage() {

    const [applicationType, setApplicationType] = useState<string>("");



    useMemo(() => {
        console.log(applicationType);
    }, [applicationType])

    return (
        <ApplicationTypeContext.Provider value={{ applicationType, setApplicationType }}>

            <div className="flex justify-center flex-col w-full lg:w p-8">
               

                <div className="items-center">
                    <DisclaimerCard />
                </div>

                <div className="items-start mt-7">
                    <SelectType />
                </div>
                {

                    applicationType ? <LeaveApplicationForm /> : null
                }
            </div>
        </ApplicationTypeContext.Provider>
    )
}