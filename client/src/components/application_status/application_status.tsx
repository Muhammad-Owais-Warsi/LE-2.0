import { useState } from "react";

export default function ApplicationStatus() {
    const [currentStep, setCurrentStep] = useState(1);

    const steps = [
        { id: 1, label: "Application Submitted" },
        { id: 2, label: "Approved by F.A" },
        { id: 3, label: "Approved by Hostel Incharge" },
        { id: 4, label: "Approved by H.O.D" },
    ];

    const nextStep = () => {
        setCurrentStep(prevStep => (prevStep < steps.length ? prevStep + 1 : prevStep));
    };

    return (
        <div className="p-6 w-full">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
                {steps.map((step, index) => (
                    <div key={step.id} className="flex-1 w-full lg:w-auto mb-4 lg:mb-0">
                        <div className="flex items-center">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                    currentStep >= step.id
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-300 text-gray-600"
                                }`}
                            >
                                {currentStep >= step.id ? "✓" : step.id}
                            </div>
                            <div
                                className={`ml-4 lg:hidden ${
                                    currentStep >= step.id
                                        ? "text-blue-600 font-semibold"
                                        : "text-gray-600"
                                }`}
                            >
                                {step.label}
                            </div>
                            {index !== steps.length - 1 && (
                                <div
                                    className={`hidden lg:block flex-1 h-1 mx-2 w-full ${
                                        currentStep > step.id
                                            ? "bg-blue-600"
                                            : "bg-gray-300"
                                    }`}
                                ></div>
                            )}
                        </div>
                        <div
                            className={`hidden lg:block mt-2 text-center relative right-14 ${
                                currentStep >= step.id
                                    ? "text-blue-600 font-semibold"
                                    : "text-gray-600"
                            }`}
                        >
                            {step.label}
                        </div>
                        {index !== steps.length - 1 && (
                            <div
                                className={`h-10 w-1 ml-5 my-2 lg:hidden ${
                                    currentStep > step.id ? "bg-blue-600" : "bg-gray-300"
                                }`}
                            />
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-8 flex justify-center">
                <button
                    onClick={nextStep}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                    Next Step
                </button>
            </div>
        </div>
    );
}