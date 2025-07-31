import React, { useState } from "react";

const UrlShortener: React.FC = () => {
  const [inputUrl, setInputUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleShorten = async () => {
    if (!inputUrl.trim()) {
      setError("Please enter a valid URL");
      return;
    }
    setLoading(true);
    setError("");
    setShortUrl("");

    try {
      const response = await fetch(
        `https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(inputUrl)}`
      );
      const data = await response.json();

      if (data.ok) {
        setShortUrl(data.result.full_short_link);
      } else {
        setError("Failed to shorten URL");
      }
    } catch (e) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 16 }}>
      <h2>URL Shortener</h2>
      <input
        type="text"
        placeholder="Enter URL here"
        value={inputUrl}
        onChange={(e) => setInputUrl(e.target.value)}
        style={{ width: "100%", padding: 8, marginBottom: 8 }}
      />
      <button
        onClick={handleShorten}
        style={{ padding: "8px 16px" }}
        disabled={loading}
      >
        {loading ? "Shortening..." : "Shorten URL"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {shortUrl && (
        <p>
          Shortened URL:{" "}
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </p>
      )}
    </div>
  );
};

export default UrlShortener;
