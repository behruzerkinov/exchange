import axios from "axios";
import { useEffect, useState } from "react";

const Currency = () => {
   const API_KEY = "795da4bbe54b40b7786bcd48";
   const [finalResult, setFinalResult] = useState([]);
   const [amount, setAmount] = useState("");
   const [result, setResult] = useState();
   const [fromValue, setFromValue] = useState("USD");
   const [toValue, setToValue] = useState("USD");

   useEffect(() => {
      axios({
         method: "GET",
         url: `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`,
      }).then((response) => {
         setFinalResult(response.data.conversion_rates);
      });
   }, [amount]);

   return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
         <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
            <div className="p-8">
               <h1 className="text-3xl font-bold text-white mb-8 text-center">
                  Currency Converter
               </h1>

               <div className="space-y-6">
                  <div className="relative">
                     <input
                        type="number"
                        className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                     />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <label className="block text-gray-400 text-sm font-medium">
                           From
                        </label>
                        <select
                           className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                           onChange={(e) => setFromValue(e.target.value)}
                        >
                           {Object.entries(finalResult).map(([key]) => (
                              <option
                                 key={key}
                                 value={key}
                                 className="bg-gray-700"
                              >
                                 {key}
                              </option>
                           ))}
                        </select>
                     </div>

                     <div className="space-y-2">
                        <label className="block text-gray-400 text-sm font-medium">
                           To
                        </label>
                        <select
                           className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                           onChange={(e) => setToValue(e.target.value)}
                        >
                           {Object.entries(finalResult).map(([key]) => (
                              <option
                                 key={key}
                                 value={key}
                                 className="bg-gray-700"
                              >
                                 {key}
                              </option>
                           ))}
                        </select>
                     </div>
                  </div>

                  <button
                     onClick={() => {
                        const fromRate = finalResult[fromValue];
                        const toRate = finalResult[toValue];
                        setResult((amount * toRate) / fromRate);
                     }}
                     className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                  >
                     Convert
                  </button>

                  {result && (
                     <div className="mt-6 p-4 bg-gray-700 rounded-lg">
                        <p className="text-gray-400 text-sm">Result:</p>
                        <p className="text-white text-2xl font-bold">
                           {amount} {fromValue} = {result.toFixed(2)} {toValue}
                        </p>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default Currency;
