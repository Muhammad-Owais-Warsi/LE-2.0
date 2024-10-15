import { Input, Button } from "@nextui-org/react"
import { useState, ChangeEvent} from "react"
import { register_form_data } from "../../types/register_form_data"
import User from "../../icons/user";
import Close from "../../icons/close";

const FormValues = {
    StudentImage: "",
    StudentName: "",
    StudentEmail: "",
    StudentRegisterNumber: "",
    CollegeName: "",
    Department: "",
    Section: "",

};


export default function StudentRegisterForm() {


    const [formData, setFormData] = useState<register_form_data>(FormValues);
    const [isSubmit,setIsSubmit] = useState<boolean>(false);

    const handleForm = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name } = e.target;
        const file = e.target.files?.[0];

        setFormData({
            ...formData,
            [name]: file ? URL.createObjectURL(file) : "",
        });
    };

    const handleRemoveFile = (fieldName: keyof register_form_data) => {
        setFormData({
            ...formData,
            [fieldName]: "",
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setIsSubmit(true);
    }

    const handleReset = () => {
        setFormData(FormValues);
    }



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center lg:col-span-2 mb-6">
                    <div className="rounded-full h-20 w-20 bg-gray-200 flex items-center justify-center overflow-hidden">
                        {formData.StudentImage ? (
                            <img src={formData.StudentImage} alt="Student" className="h-full" />
                        ) : (
                            <User className="w-7 h-7" />
                        )}
                    </div>
                    <div className="flex items-center">
                        <Button
                            size="md"
                            className="mt-2"
                            onClick={() => document.getElementById('student-photo-input')?.click()}
                        >
                            {formData.StudentImage ? "Change Photo" : "Upload Photo"}
                            <input
                                type="file"
                                id="student-photo-input"
                                accept="image/*"
                                className="hidden"
                                name="StudentImage"
                                onChange={handleFileChange}
                            />
                        </Button>
                        {formData.StudentImage && (
                            <div className="h-10 w-10 rounded-xl cursor-pointer border ml-3 mt-[0.2rem] flex justify-center items-center" onClick={() => handleRemoveFile("StudentImage")}>
                                <Close className="h-4 w-4 text-white" />
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-center items-center flex-col w-full gap-11">
                    <div className="w-full">
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            <Input
                                isRequired label="Name"
                                labelPlacement="outside"
                                placeholder="Enter your name"
                                name="StudentName"
                                value={formData.StudentName}
                                onChange={handleForm}
                            />
                            <Input
                                isRequired label="Email"
                                labelPlacement="outside"
                                placeholder="Enter your email"
                                name="StudentEmail"
                                value={formData.StudentEmail}
                                onChange={handleForm}
                            />
                            <Input
                                isRequired
                                label="Register Number"
                                labelPlacement="outside"
                                placeholder="Enter your register number"
                                name="StudentRegisterNumber"
                                value={formData.StudentRegisterNumber}
                                onChange={handleForm}
                            />

                        </div>
                    </div>



                    <div className="w-full">
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            <Input
                                isRequired
                                label="College Name"
                                labelPlacement="outside"
                                placeholder="College name"
                                name="CollegeName"
                                onChange={handleForm}
                            />
                            <Input
                                isRequired
                                label="Department"
                                labelPlacement="outside"
                                placeholder="Enter your department"
                                name="Department"
                                onChange={handleForm}
                            />
                            <Input
                                isRequired
                                label="Section"
                                labelPlacement="outside"
                                placeholder="Enter your section"
                                name="Section"
                                onChange={handleForm}
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full mt-8">
                    <hr className="w-full" />
                </div>

                <div className="flex justify-end items-center gap-7 mt-5 w-full">
                    <Button color="danger" type="reset" onClick={handleReset}>Reset</Button>
                    <Button variant="solid" color="primary" type="submit" onClick={handleSubmit}>Submit</Button>
                </div>
            </form>
        </div>
    )
}