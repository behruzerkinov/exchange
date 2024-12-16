import axios from "axios";
import { useEffect, useState } from "react";
const Currency = () => {
  const API_KEY = "deb73e0c60-4b33e10ffd-sokr93";
  const [finalResult, setFinalResult] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: `https://api.fastforex.io/currencies?api_key=${API_KEY}`,
    }).then((response) => {
      console.log(response.data.currencies);
      setFinalResult(response.data.currencies);
    });
  }, []);

  return (
    <div>
      <h1>Currency</h1>
      <div>
        <select>
          {Object.entries(finalResult).map(([key, value]) => (
            <option key={key} value={key}>
              {key.toUpperCase()} :{value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Currency;
