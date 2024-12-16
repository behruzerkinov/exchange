import axios from "axios";
import { useEffect, useState } from "react";
const Currency = () => {
   const API_KEY = "795da4bbe54b40b7786bcd48";
   const [finalResult, setFinalResult] = useState([]);
   const [amount, setAmount] = useState();
   const [result, setResult] = useState();
   const [fromValue, setFromValue] = useState("USD");
   const [toValue, setToValue] = useState("UZS");

   useEffect(() => {
      axios({
         method: "GET",
         url: `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`,
      }).then((response) => {
         //  console.log(response.data.currencies);
         setFinalResult(response.data.conversion_rates);
      });
   }, [amount]);

   return (
      <div>
         <h1>Currency</h1>
         <div>
            <input
               type="number"
               id="fromValue"
               value={amount}
               onChange={(e) => {
                  const currentValue = e.target.value;
                  e.preventDefault();
                  setAmount(e.target.value);
                  console.log(currentValue);
               }}
            />
            <div className="display-flex">
               <label>From</label>
               <select onChange={(e) => setFromValue(e.target.value)}>
                  {Object.entries(finalResult).map(([key, value]) => (
                     <option key={key} value={key}>
                        {key}
                     </option>
                  ))}
               </select>
               <select onChange={(e) => setToValue(e.target.value)}>
                  {Object.entries(finalResult).map(([key, value]) => (
                     <option key={key} value={key}>
                        {key}
                     </option>
                  ))}
               </select>
               <section>
                  <button
                     onClick={() => {
                        const fromRate = finalResult[fromValue];
                        const toRate = finalResult[toValue];
                        // console.log(fromRate, toRate);
                        setResult((amount * toRate) / fromRate);
                     }}
                  >
                     Convert
                  </button>
               </section>
            </div>
         </div>
         <section className="result">Result is: {result}</section>
      </div>
   );
};

export default Currency;
