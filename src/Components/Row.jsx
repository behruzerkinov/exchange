import { useEffect, useState } from "react";

const Row = () => {
   const API_KEY = "deb73e0c60-4b33e10ffd-sokr93";
   const [finalResult, setFinalResult] = useState([]);
   useEffect(() => {
      fetch(`https://api.fastforex.io/currencies?api_key=${API_KEY}`)
         .then((res) => res.json())
         .then((data) => {
            setFinalResult(data);
            console.log(data);
         });
   }, [finalResult]);

   return <div></div>;
};

export default Row;
