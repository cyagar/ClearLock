import { useEffect, useState } from "react";
import "./Home.css";

function Home() {
  const [time, setTime] = useState("");
  const [quote, setQuote] = useState({ text: "", author: "" });
  const [quoteVisible, setQuoteVisible] = useState(false);
  const [clockVisible, setClockVisible] = useState(false);

  function formatMin(number) {
    return number < 10 ? "0" + number : number;
  }

  function showTime() {
    const now = new Date();
    let hr = now.getHours();
    const min = formatMin(now.getMinutes());
    hr = hr % 12 || 12;
    return `${hr}:${min}`;
  }

  async function fetchQuote() {
    try {
      const zenURL = "https://zenquotes.io/api/random";
      // Using AllOrigins proxy, it wraps the response in a 'contents' property
      const proxyURL = `https://api.allorigins.win/get?url=${encodeURIComponent(zenURL)}`;
      
      const res = await fetch(proxyURL);
      if (!res.ok) throw new Error("Network response failed");
      
      const wrapper = await res.json();
      // AllOrigins returns the API response as a string inside .contents
      const data = JSON.parse(wrapper.contents);

      if (data && data[0]) {
        setQuote({ text: data[0].q, author: data[0].a });
        setQuoteVisible(true);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      // Fallback if proxy or API fails
      setQuote({
        text: "At the end of the day the day ends.",
        author: "Unknown",
      });
      setQuoteVisible(true);
    }
  }

  useEffect(() => {
    setTime(showTime());
    fetchQuote();

    // Reset visibility for animation trigger
    setClockVisible(false);
    const animTimeout = setTimeout(() => setClockVisible(true), 50);

    const interval = setInterval(() => {
      setTime(showTime());
    }, 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(animTimeout);
    };
  }, []);

  return (
    <div className="home">
      <div className={`quote ${quoteVisible ? "visible" : ""}`}>
        {quote.text ? (
          <>
            <span className="text">"{quote.text}"</span>
            {quote.author && <div className="author">- {quote.author}</div>}
          </>
        ) : (
          <span className="placeholder">Loading quote...</span>
        )}
      </div>

      <div className={`clock ${clockVisible ? "visible" : ""}`}>
        <h1 className="clock-time">{time}</h1>
      </div>
    </div>
  );
}

export default Home;