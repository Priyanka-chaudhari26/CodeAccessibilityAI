import React, { useState } from "react";
import {CodeIcon } from "@phosphor-icons/react";
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
        console.log(data.theme);
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
        <h1 style={{ textAlign: "center" }}>Code Accessibility AI <CodeIcon size={43} color="#bb86fc" weight="bold" /></h1>
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
        <div style={{display:'flex',flexDirection:'row', justifyContent:'space-around'}}>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., 'A calming website for a yoga studio'"
          style={{width:'70%'}}
        />
        <button onClick={getTheme} disabled={loading} style={{height:'40px'}}>
          {loading ? "Getting Theme..." : "Get Theme"}
        </button>
        </div>
        {theme && (
          <div>
            <h2>Suggested Theme</h2>
            <div>
              <h3 style={{textAlign:'left',paddingLeft:'2rem'}}>Color Palette</h3>
              <div style={{ display: "flex", gap: "1rem",paddingLeft:'2rem'}}>
                <div
                  style={{
                    backgroundColor: theme.palette.primary,
                    padding: "1rem",
                    // color: theme.palette.text,
                    color:"white",
                  }}
                >
                  Primary
                </div>
                <div
                  style={{
                    backgroundColor: theme.palette.secondary,
                    color:"white",
                    padding: "1rem",
                    // color: theme.palette.text,
                  }}
                >
                  Secondary
                </div>
                <div
                  style={{
                    backgroundColor: theme.palette.accent,
                    color:"white",
                    padding: "1rem",
                    // color: theme.palette.text,
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
              <h3 style={{textAlign:"left",paddingLeft:"2rem"}}>Fonts</h3>
              <table style={{marginLeft:"2rem"}}>
                <tr style={{textAlign:'left'}}>
                  <td style={{ paddingRight: '20px' }}><strong>Heading: </strong></td>
                  <td>{theme.fonts.heading}</td>
                </tr>
                <tr style={{textAlign:'left'}}>
                  <td style={{ paddingRight: '20px' }}><strong>Body: </strong></td>
                  <td>{theme.fonts.body}</td>
                </tr>
              </table>
              {/* <div style={{padding:'0.5rem 2rem 0.2rem 2rem',textAlign:"left"}}>
                <strong>Heading: </strong> {theme.fonts.heading}
              </div>
              <div style={{padding:'0.5rem 2rem 0.2rem 2rem',textAlign:"left"}}>
                <strong>Body: </strong> {theme.fonts.body}
              </div> */}
            </div>
            {/* 👀 Preview Section */}
            <div
              style={{
                margin: "2rem",
                padding: "1.5rem",
                border: "1px solid #ccc",
                borderRadius: "10px",
                backgroundColor: theme.palette.background,
                color: theme.palette.text,
                fontFamily: theme.fonts.body,
                maxWidth: "500px",
                alignItems:"center"
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
              <p style={{color:theme.palette.text}}>
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
