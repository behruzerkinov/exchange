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
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
         <div className="w-full max-w-md bg-neutral-800 rounded-[28px] shadow-2xl overflow-hidden border border-neutral-700">
            <div className="p-8">
               <h1 className="text-4xl font-bold text-purple-200 mb-8 text-center">
                  Currency Converter
               </h1>

               <div className="space-y-6">
                  <div className="relative">
                     <input
                        type="number"
                        className="w-full bg-neutral-700/50 text-white rounded-[16px] px-4 py-4 outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder-neutral-400"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                     />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <label className="block text-purple-300 text-sm font-medium ml-1">
                           From
                        </label>
                        <select
                           className="w-full bg-neutral-700/50 text-white rounded-[16px] px-4 py-4 outline-none focus:ring-2 focus:ring-purple-500/50 transition-all appearance-none"
                           onChange={(e) => setFromValue(e.target.value)}
                        >
                           {Object.entries(finalResult).map(([key]) => (
                              <option
                                 key={key}
                                 value={key}
                                 className="bg-neutral-800"
                              >
                                 {key}
                              </option>
                           ))}
                        </select>
                     </div>

                     <div className="space-y-2">
                        <label className="block text-purple-300 text-sm font-medium ml-1">
                           To
                        </label>
                        <select
                           className="w-full bg-neutral-700/50 text-white rounded-[16px] px-4 py-4 outline-none focus:ring-2 focus:ring-purple-500/50 transition-all appearance-none"
                           onChange={(e) => setToValue(e.target.value)}
                        >
                           {Object.entries(finalResult).map(([key]) => (
                              <option
                                 key={key}
                                 value={key}
                                 className="bg-neutral-800"
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
                     className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-4 px-4 rounded-[16px] transition-all active:scale-[0.98] shadow-lg elevation-2"
                  >
                     Convert
                  </button>

                  {result && (
                     <div className="mt-6 p-6 bg-neutral-700/50 rounded-[20px] border border-neutral-600">
                        <p className="text-purple-300 text-sm font-medium">
                           Result
                        </p>
                        <div className="flex items-baseline space-x-2 mt-2">
                           <p className="text-white text-3xl font-semibold">
                              {result.toFixed(2)} {toValue}
                           </p>
                           <p className="text-neutral-400 text-sm">
                              from {amount} {fromValue}
                           </p>
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default Currency;
