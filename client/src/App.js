import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleShorten = async () => {
    if (!longUrl) {
      toast.error("Please enter a URL");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/shorten", { longUrl });
      setShortUrl(response.data.shortUrl);
      toast.success("Short URL generated!");
    } catch (error) {
      toast.error("Failed to shorten URL");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="container">
      <ToastContainer />
      <h1>URL Shortener</h1>
      <input
        type="text"
        placeholder="Enter long URL"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
      />
      <button onClick={handleShorten}>Shorten</button>
      
      {shortUrl && (
        <div className="result">
          <p>Short URL:</p>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
          <button onClick={copyToClipboard}>Copy</button>
        </div>
      )}
    </div>
  );
}

export default App;
