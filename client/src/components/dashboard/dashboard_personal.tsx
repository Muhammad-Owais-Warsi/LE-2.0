
export default function DashboardPersonal() {

    // User data stored in key-value pairs
    const details = [
        {
            name: "Student Name",
            value: "Muhammad Owais Warsi"
        },
        {
            name: "Student ID",
            value: "592959"
        },
        {
            name: "Register No.",
            value: "RA2311003020332"
        },
        {
            name: "Email ID",
            value: "mw1078@srmist.edu.in"
        }
    ];

    return (
        <div className="flex justify-center items-center mt-10">
            <div className="lg:w-[40rem] bg-white shadow-md border border-gray-200 rounded-lg"> {/* Responsive widths */}
                <div className="bg-[rgb(57,129,191)] p-4 rounded-t-lg text-white text-lg font-bold flex items-center">
                    Student Profile
                </div>

                <div className="p-6">
                    <div className="flex flex-col gap-4 text-gray-800">
                        {details.map((detail, index) => (
                            <div key={index}>
                                <div className="flex items-center justify-between  sm:gap-7 md:gap-7">
                                    <div className="font-semibold">{detail.name}:</div>
                                    {" "}
                                    <div className="text-blue-600">{detail.value}</div>
                                </div>
                                <hr className="my-2" /> 
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
