import { Input, Button, Textarea, DatePicker } from "@nextui-org/react";
import { useState, ChangeEvent } from "react";
import { getLocalTimeZone, today } from "@internationalized/date";
import User from "../../icons/user";
import File from "../../icons/file";
import Close from "../../icons/close";


export default function LeaveApplicationForm() {

  const [studentPhoto, setStudentPhoto] = useState<string | null>(null);
  const [proofFile, setProofFile] = useState<File | null>(null);



  const handleStudentPhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setStudentPhoto(URL.createObjectURL(file));
    }
  };

  const handleProofFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProofFile(file);
    }
  };

  const handleRemoveStudentPhoto = () => {
    setStudentPhoto(null);

    const studentPhotoInput = document.getElementById('student-photo-input') as HTMLInputElement;
    if (studentPhotoInput) {
      studentPhotoInput.value = '';
    }
  };

  const handleRemoveProofFile = () => {
    setProofFile(null);

    const proofFileInput = document.getElementById('proof-file-input') as HTMLInputElement;
    if (proofFileInput) {
      proofFileInput.value = '';
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-transparent w-full lg:w-[90vw] p-8">

        <div>

          <h1 className="text-3xl font-bold text-center mb-8 mt-11">Leave Application Form</h1>
        </div>

        <div className="flex flex-col items-center lg:col-span-2 mb-6">
          <div className="rounded-full h-20 w-20 bg-gray-200 flex items-center justify-center overflow-hidden">
            {studentPhoto ? (
              <img src={studentPhoto} alt="Student" className="h-full" />
            ) : (
              <div>
                <User className="w-7 h-7" />
              </div>
            )}
          </div>
          <div className="flex items-center">
            <Button
              size="md"
              className="mt-2"
              onClick={() => document.getElementById('student-photo-input')?.click()}
            >
              {studentPhoto ? "Change Photo" : "Upload Photo"}
              <input
                type="file"
                id="student-photo-input"
                accept="image/*"
                className="hidden"
                onChange={handleStudentPhotoChange}
              />
            </Button>

            {studentPhoto && (
              <div className="h-10 w-10 rounded-xl cursor-pointer border ml-3 mt-[0.2rem] flex justify-center items-center" onClick={handleRemoveStudentPhoto}>
                <Close className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
        </div>

        {/* Form with sections */}
        <form className="">
          <div className="flex justify-center items-center flex-col w-full gap-11">
            <div className="w-full">
              <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <Input isRequired label="Name" labelPlacement="outside" placeholder="Enter your name" />
                <Input isRequired label="Email" labelPlacement="outside" placeholder="Enter your email" className="w-full" />
                <Input isRequired label="Register Number" labelPlacement="outside" placeholder="Enter your register number" className="w-full" />
                <Input isRequired label="Student Phone Number" labelPlacement="outside" placeholder="Enter your phone number" className="w-full" />
                <Input isRequired label="Parent Phone Number" labelPlacement="outside" placeholder="Enter your parent's phone number" className="w-full" />
              </div>
            </div>

            <div className="w-full">
              <h2 className="text-xl font-semibold mb-4">Accommodation</h2>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <Input isRequired label="Hostel Name" labelPlacement="outside" placeholder="Enter your hostel name" className="w-full" />
                <Input isRequired label="Room Number" labelPlacement="outside" placeholder="Enter your room number" className="w-full" />
              </div>
            </div>

            <div className="w-full">
              <h2 className="text-xl font-semibold mb-4">Leave Details</h2>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <DatePicker isRequired label="Date Out" labelPlacement="outside" className="w-full" minValue={today(getLocalTimeZone())} />
                <DatePicker isRequired label="Date In" labelPlacement="outside" className="w-full" minValue={today(getLocalTimeZone())} />
                <Input isRequired label="Time In" labelPlacement="outside" type="time" className="w-full" />
                <Input isRequired label="Time Out" labelPlacement="outside" type="time" className="w-full" />
                <Textarea isRequired label="Reason" labelPlacement="outside" placeholder="Reason for leave" className="w-full" />
              </div>
            </div>

            <div className="w-full">
              <h2 className="text-xl font-semibold mb-4">Academic Details</h2>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <Input isRequired label="College Name" labelPlacement="outside" placeholder="College name" className="w-full" />
                <Input isRequired label="Department" labelPlacement="outside" placeholder="Enter your department" className="w-full" />
                <Input isRequired label="Section" labelPlacement="outside" placeholder="Enter your section" className="w-full" />
              </div>
            </div>
          </div>

          {/* Proof File Upload */}
          <div className="flex flex-col lg:col-span-2 mt-4 w-full">
            <label className="text-sm font-medium text-gray-700 mb-2">Upload Proof (File)</label>
            <div className="bg-gray-200 h-40 w-full flex items-center justify-center overflow-hidden">
              {proofFile ? (
                <a href={URL.createObjectURL(proofFile)} target="_blank" rel="noopener noreferrer" className="text-gray-500 underline">
                  {proofFile.name} {/* Display the file name */}
                </a>
              ) : (
                <div className="w-10 h-10">
                  <File className="w-10 h-10 text-black" />
                </div>
              )}
            </div>
            <div className="flex items-center">
              <Button size="md" className="mt-2 w-full" onClick={() => document.getElementById('proof-file-input')?.click()}>
                {proofFile ? "Change Proof" : "Upload Proof"}
                <input
                  type="file"
                  id="proof-file-input"
                  className="hidden"
                  onChange={handleProofFileChange}
                />
              </Button>
              {proofFile && (
                <div className="h-10 w-10 rounded-xl cursor-pointer border ml-3 mt-[0.2rem] flex justify-center items-center" onClick={handleRemoveProofFile}>
                  <Close className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
          </div>

          <div className="w-full mt-8">
            <hr className="w-full" />
          </div>

          <div className="flex justify-end items-center gap-7 mt-5 w-full">
            <Button color="danger" type="reset">Reset</Button>
            <Button variant="solid" color="primary" type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
