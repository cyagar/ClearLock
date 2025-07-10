import { useEffect, useState } from "react";
import "./Home.css";

function Home() {
  // Time state starting as empty string
  const [time, setTime] = useState("");
  // Quote state
  const [quote, setQuote] = useState({ text: "", author: "" });
  const [quoteVisible, setQuoteVisible] = useState(false);
  const [clockVisible, setClockVisible] = useState(false);

  // Ensures minutes are always two digit
  function formatMin(number) {
    return number < 10 ? "0" + number : number;
  }

  // Show time in desired (H)H:MM format
  function showTime() {
    const time = new Date();
    let hr = time.getHours();
    const min = formatMin(time.getMinutes());
    hr = hr % 12;
    hr = hr === 0 ? 12 : hr;
    return `${hr}:${min}`;
  }

  async function fetchQuote() {
    try {
      const zenURL = "https://zenquotes.io/api/random";
      const proxyURL = "https://corsproxy.io/?" + encodeURIComponent(zenURL);
      const res = await fetch(proxyURL);
      const [data] = await res.json();
      setQuote({ text: data.q, author: data.a });
      setQuoteVisible(true);
    } catch (err) {
      console.error(err);
      setQuote({ text: "Keep calm and code on.", author: "Unknown" });
      setQuoteVisible(true);
    }
  }

  // React effect that runs once on initial mount
  useEffect(() => {
    // Immediatly set time
    setTime(showTime());
    // Get quote
    fetchQuote();
    setClockVisible(false); // ensure it's hidden first
    setTimeout(() => setClockVisible(true), 10); // delay triggers transition
    // Upadate clock every second
    const interval = setInterval(() => {
      setTime(showTime());
    }, 1000);
    // Clean up time on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="home">
      <div className={`quote ${quoteVisible ? "visible" : ""}`}>
        {quote.text ? (
          `"${quote.text}"`
        ) : (
          <span className="placeholder">Loading quote...</span>
        )}
        {quote.author && <div className="author">- {quote.author}</div>}
      </div>

      <div id="clock" className={clockVisible ? "visible" : ""}>
        <h1>{time}</h1>
      </div>
    </div>
  );
}

export default Home;