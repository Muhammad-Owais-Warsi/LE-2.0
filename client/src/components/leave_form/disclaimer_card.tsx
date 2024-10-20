export default function DisclaimerCard() {
    return (
      <div className="flex flex-col justify-start items-start space-x-2 bg-yellow-200 text-yellow-800 border border-yellow-500 rounded-xl px-4 py-2 shadow-sm">

      <div className="flex items-center mb-4 ">
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
  
