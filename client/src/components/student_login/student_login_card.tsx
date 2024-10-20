import { Input, Button } from "@nextui-org/react";

export default function StudentLoginCard() {
    return (
        <div className="flex justify-center flex-col items-center shadow-2xl">
            <h1 className="text-2xl font-bold text-center bg-[rgb(51,122,183)] text-white py-4 rounded-t-lg w-full">
                Leave Portal
            </h1>
            <div className="w-full max-w-md p-8 flex justify-center items-center flex-col gap-2 bg-white shadow-lg rounded-lg">
                {/* Form Content */}
                <div className="flex flex-col gap-6 p-8 w-full">
                    {/* NetID Input */}
                    <div className="relative w-full">
                        <Input
                            isRequired
                            label="Email"
                            labelPlacement="outside"
                            placeholder="NetID"
                            variant="bordered"
                            size="lg"
                            className="w-full md:max-w-lg"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="relative w-full">
                        <Input
                            isRequired
                            type="password"
                            label="Password"
                            labelPlacement="outside"
                            placeholder="Password"
                            variant="bordered"
                            size="lg"
                            className="w-full md:max-w-lg"
                        />
                    </div>

                    {/* Login Button */}
                    <Button variant="solid" color="primary" size="lg" className="w-full">
                        Login 
                    </Button>
                </div>
            </div>
        </div>
    );
}
