import { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");

  const processQuery = async () => {
    try {
      console.log("Processing query:", query);
      const response = await fetch("http://localhost:8000/api/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the Content-Type header
        },
        body: JSON.stringify({ question: query }),
      });

      // check if the response is ok
      if (!response.ok) {
        throw new Error("Error in response");
      }

      const data = await response.json();
      console.log("Response from server:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="w-screen h-screen bg-blue-400 absolute top-0 left-0 flex flex-col items-center justify-center">
        <div
          className="h-15 w-160 bg-white rounded-lg p-3 flex"
          id="text-box-div"
        >
          <textarea
            className="w-full h-full bg-yellow-100 flex align-middle justify-center text-center rounded-md"
            placeholder="  Query AFL Data"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          ></textarea>
          <button className="" onClick={processQuery}></button>
        </div>
      </div>
    </>
  );
}

export default App;
