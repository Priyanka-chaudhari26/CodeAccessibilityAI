import React, { useState } from "react";
import "./ThemeSuggester.css";

const ThemeSuggester = ({ setSelectedFeature }) => {
  const [topic, setTopic] = useState("");
  const [theme, setTheme] = useState(null);
  const [loading, setLoading] = useState(false);

  const getTheme = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/api/suggest-theme", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic }),
      });
      const data = await response.json();
      if (response.ok) {
        setTheme(data.theme);
      } else {
        throw new Error(data.error || "Failed to fetch theme");
      }
    } catch (error) {
      console.error("Error fetching theme:", error);
    }
    setLoading(false);
  };

  return (
    <div>
      <header
        className="header-content"
        tabIndex="0"
        onClick={() => setSelectedFeature(null)}
        onKeyDown={(e) => e.key === "Enter" && setSelectedFeature(null)}
      >
        <h1 style={{ textAlign: "center" }}>Code Accessibility AI</h1>
        <p style={{ textAlign: "center" }}>
          Your AI-powered partner for accessible development
        </p>
      </header>
      {/* <button onClick={() => setSelectedFeature(null)}>Back</button> */}
      <div className="theme-suggester">
        <h1>Theme Suggester</h1>
        <p>
          Enter a topic to get UI theme suggestions for color-blind or visually
          impaired users.
        </p>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., 'A calming website for a yoga studio'"
        />
        <button onClick={getTheme} disabled={loading}>
          {loading ? "Getting Theme..." : "Get Theme"}
        </button>
        {theme && (
          <div>
            <h2>Suggested Theme</h2>
            <div>
              <h3>Color Palette</h3>
              <div style={{ display: "flex", gap: "1rem" }}>
                <div
                  style={{
                    backgroundColor: theme.palette.primary,
                    padding: "1rem",
                    color: theme.palette.text,
                  }}
                >
                  Primary
                </div>
                <div
                  style={{
                    backgroundColor: theme.palette.secondary,
                    padding: "1rem",
                    color: theme.palette.text,
                  }}
                >
                  Secondary
                </div>
                <div
                  style={{
                    backgroundColor: theme.palette.accent,
                    padding: "1rem",
                    color: theme.palette.text,
                  }}
                >
                  Accent
                </div>
                <div
                  style={{
                    backgroundColor: theme.palette.background,
                    padding: "1rem",
                    color: theme.palette.text,
                    border: "1px solid " + theme.palette.text,
                  }}
                >
                  Background
                </div>
                <div
                  style={{
                    backgroundColor: theme.palette.text,
                    padding: "1rem",
                    color: theme.palette.background,
                  }}
                >
                  Text
                </div>
              </div>
            </div>
            <div>
              <h3>Fonts</h3>
              <p>
                <strong>Heading:</strong> {theme.fonts.heading}
              </p>
              <p>
                <strong>Body:</strong> {theme.fonts.body}
              </p>
            </div>
            {/* 👀 Preview Section */}
            <div
              style={{
                marginTop: "2rem",
                padding: "1.5rem",
                border: "1px solid #ccc",
                borderRadius: "10px",
                backgroundColor: theme.palette.background,
                color: theme.palette.text,
                fontFamily: theme.fonts.body,
                maxWidth: "500px",
              }}
            >
              <h2
                style={{
                  fontFamily: theme.fonts.heading,
                  color: theme.palette.primary,
                }}
              >
                Welcome to My Themed Page
              </h2>
              <p>
                This is how body text will appear using the{" "}
                <b>{theme.fonts.body}</b> font. Colors and contrast are based on
                the suggested accessible palette.
              </p>
              <button
                style={{
                  backgroundColor: theme.palette.accent,
                  color: theme.palette.background,
                  border: "none",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontFamily: theme.fonts.heading,
                  fontSize: "1rem",
                }}
              >
                Call to Action
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThemeSuggester;
