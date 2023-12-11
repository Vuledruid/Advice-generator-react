import { useEffect, useState } from "react";
import "./App.css";
import svgImg from "./pattern.svg"
import svgImgLast from "./icon-dice.svg"


function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.adviceslip.com/advice");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setData(data);
        setError(null);
      } catch (error) {
        console.error("There was an error in fetching data!", error);
        setError("Error fetching data. Please try again."); 
      }
    };

    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      <main className="main">
        {data ? (
          <>
            <h3 className="main-title">Advice number #{data.slip.id}</h3>
            <p className="main-paragraph"> "{data.slip.advice}"</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
        {error && <p className="error-message">{error}</p>}
        <img className="img-main" src={svgImg} alt="Divider "/>
        <span className="circle">
        <img src={svgImgLast} alt="main logo" className="img-second" />
        </span>
      </main>
    </div>
  );
}

export default App;
