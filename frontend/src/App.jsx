import { useState } from "react";
import DynamicTable from "./components/DynamicTable";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [displayResult, setDisplayResult] = useState(true);
  const [loading, setLoading] = useState(false);

  // Function to simulate a delay
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const processQuery = async () => {
    try {
      setLoading(true);
      setDisplayResult(false);

      await sleep(5000); // Simulate a delay

      console.log("Processing query:", query);

      const res = await fetch("http://localhost:8000/api/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: query }),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();

      setResult(data);
      setLoading(false);
      setDisplayResult(true);

      console.log("Response:", data);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false); // Just in case something breaks before it finishes
    }
  };

  return (
    <>
      <div className="w-screen h-screen bg-light_display flex flex-col">
        <div className="w-full h-auto mb-2 flex flex-col items-center justify-center">
          <span className="font-landing text-dark_display mt-5 text-[calc(100vw/8)] md:text-[calc(100vw/20)]">
            Statball
          </span>
          <span className="font-label text-dark_display text-[calc(100vw/28)] md:text-[calc(100vw/60)]">
            An AFL Statistic Query Tool
          </span>
        </div>
        <div className="w-full h-auto flex flex-col md:flex-row items-center justify-center gap-y-2 mb-5">
          <input
            type="text"
            className="w-6/7 h-8 text-[14px] rounded-xl md:max-w-[calc(100vw/2)] bg-white p-2 text-blue-300 text-left ring-blue-300 border-2 border-white focus:border-blue-300 outline-none font-label"
            placeholder="Ask a question about the game..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="w-25 h-8 bg-white rounded-xl text-blue-300 ml-4 text-sm font-label
            active:bg-blue-300 active:text-white
            "
            onClick={processQuery}
          >
            Execute
          </button>
        </div>
        {/** Delete this element */}
        {/** Element to render when the content is loading from the backend */}
        {loading && (
          <div className="w-full h-auto flex flex-col items-center justify-left">
            <div className="w-30 h-10">
              <span className="font-label text-dark_display text-[calc(100vw/28)] md:text-[calc(100vw/60)] relative">
                Loading
              </span>
              <span className="font-label text-dark_display text-[calc(100vw/28)] md:text-[calc(100vw/60)] relative animate-dots"></span>
            </div>
          </div>
        )}
        {/** Element to render results of the query */}
        {displayResult && result?.result && Array.isArray(result.result) && (
          <DynamicTable data={result.result} />
        )}
      </div>
    </>
  );
}

export default App;
