import { Input, Button, Textarea, DatePicker } from "@nextui-org/react";
import { useState, ChangeEvent, useEffect } from "react";
import { getLocalTimeZone, today } from "@internationalized/date";
import User from "../../icons/user";
import File from "../../icons/file";
import Close from "../../icons/close";
import { form_data } from "../../types/leave_form_data";

const FormValues = {
  StudentImage: "",
  StudentName: "",
  StudentEmail: "",
  StudentRegisterNumber: "",
  StudentPhoneNumber: "",
  ParentPhoneNumber: "",
  HostelName: "",
  HostelRoomNumber: "",
  DateOut: today(getLocalTimeZone()).toString(),
  DateIn: today(getLocalTimeZone()).toString(),
  TimeOut: "",
  TimeIn: "",
  Reason: "",
  CollegeName: "",
  CollegeYear: "",
  Department: "",
  Section: "",
  LeaveProof: "",
};

export default function LeaveApplicationForm() {

  const [formData, setFormData] = useState<form_data>(FormValues);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);


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

  const handleRemoveFile = (fieldName: keyof form_data) => {
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

  useEffect(() => {
    console.log("submit:", formData)
    setFormData(FormValues)
  }, [isSubmit])



  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-transparent w-full lg:w-[90vw] p-8">
        <h1 className="text-3xl font-bold text-center mb-8 mt-11">Leave Application Form</h1>

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
              <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
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
                <Input
                  isRequired
                  label="Student Phone Number"
                  labelPlacement="outside"
                  placeholder="Enter your phone number"
                  name="StudentPhoneNumber"
                  value={formData.StudentPhoneNumber}
                  onChange={handleForm}
                />
                <Input
                  isRequired
                  label="Parent Phone Number"
                  labelPlacement="outside"
                  placeholder="Enter your parent's phone number"
                  name="ParentPhoneNumber"
                  value={formData.ParentPhoneNumber}
                  onChange={handleForm}
                />
              </div>
            </div>

            <div className="w-full">
              <h2 className="text-xl font-semibold mb-4">Accommodation</h2>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <Input
                  isRequired
                  label="Hostel Name"
                  labelPlacement="outside"
                  placeholder="Enter your hostel name"
                  name="HostelName"
                  value={formData.HostelName}
                  onChange={handleForm}
                />
                <Input
                  isRequired
                  label="Room Number"
                  labelPlacement="outside"
                  placeholder="Enter your room number"
                  name="HostelRoomNumber"
                  value={formData.HostelRoomNumber}
                  onChange={handleForm}
                />
              </div>
            </div>

            <div className="w-full">
              <h2 className="text-xl font-semibold mb-4">Leave Details</h2>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <DatePicker
                  isRequired
                  label="Date Out"
                  labelPlacement="outside"
                  minValue={today(getLocalTimeZone())}
                  name="DateOut"
                  onChange={handleForm}
                />
                <DatePicker
                  isRequired
                  label="Date In"
                  labelPlacement="outside"
                  minValue={today(getLocalTimeZone())}
                  name="DateIn"
                  onChange={handleForm}
                />
                <Input
                  isRequired
                  label="Time Out"
                  labelPlacement="outside"
                  type="time"
                  name="TimeOut"
                  onChange={handleForm}
                />
                <Input
                  isRequired
                  label="Time In"
                  labelPlacement="outside"
                  type="time"
                  name="TimeIn"
                  onChange={handleForm}
                />
                <Textarea
                  isRequired
                  label="Reason"
                  labelPlacement="outside"
                  placeholder="Reason for leave"
                  name="Reason"
                  onChange={handleForm}
                />
              </div>
            </div>

            <div className="w-full">
              <h2 className="text-xl font-semibold mb-4">Academic Details</h2>
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
                  label="Year"
                  labelPlacement="outside"
                  placeholder="College Year"
                  name="CollegeYear"
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

            <div className="flex flex-col lg:col-span-2 mt-4 w-full">
              <label className="text-sm font-medium text-gray-700 mb-2">Upload Proof (File)</label>
              <div className="bg-gray-200 h-40 w-full flex items-center justify-center overflow-hidden">
                {formData.LeaveProof ? (
                  <a href={formData.LeaveProof} target="_blank" rel="noopener noreferrer" className="text-gray-500 underline">
                    {formData.LeaveProof}
                  </a>
                ) : (
                  <div className="h-10 w-10">
                    <File className="w-10 h-10 text-black" />
                  </div>
                )}
              </div>
              <div className="flex items-center">
                <Button size="md" className="mt-2 w-full" onClick={() => document.getElementById('proof-file-input')?.click()}>
                  {formData.LeaveProof ? "Change Proof" : "Upload Proof"}
                  <input
                    type="file"
                    id="proof-file-input"
                    className="hidden"
                    name="LeaveProof"
                    onChange={handleFileChange}
                  />
                </Button>
                {formData.LeaveProof && (
                  <div className="h-10 w-10 rounded-xl cursor-pointer border ml-3 mt-[0.2rem] flex justify-center items-center" onClick={() => handleRemoveFile("LeaveProof")}>
                    <Close className="h-4 w-4 text-white" />
                  </div>
                )}
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
    </div>
  );
}
