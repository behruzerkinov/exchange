import axios from "axios";
import { useState } from "react";
const Currency = () => {
   const API_KEY = "deb73e0c60-4b33e10ffd-sokr93";
   const [finalResult, setFinalResult] = useState([]);

   axios({
      method: "GET",
      url: `https://api.fastforex.io/currencies?api_key=${API_KEY}`,
   })
      .then((response) => response.json())
      .then((data) => setFinalResult(data))
      .then(console.log(finalResult));

   return (
      <div>
         <h1>Currency</h1>
         <div>
            <select>
               {finalResult.map((item) => (
                  <option key={item} value={item}>
                     {item}
                  </option>
               ))}
            </select>
         </div>
      </div>
   );
};

export default Currency;
