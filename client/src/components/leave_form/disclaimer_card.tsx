export default function DisclaimerCard() {
    return (
      <div className="w-full bg-yellow-200 border-l-4 border-red-500 text-[#337AB7] p-6 my-6 rounded-lg shadow-lg backdrop-blur-md">
        <div className="flex items-center mb-4">
          <h1 className="text-2xl font-bold ">Points to Remember</h1>
        </div>
        <div>
          <ul className="list-disc pl-5 space-y-3 text-lg font-semibold">
            <li>Ensure all personal details are filled accurately.</li>
            <li>Upload a recent passport-size photograph.</li>
            <li>Provide valid proof for the leave request.</li>
            <li>Submit the form before the deadline.</li>
          </ul>
        </div>
      </div>
    );
  }
  