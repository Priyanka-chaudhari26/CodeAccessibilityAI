import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import {CodeIcon } from "@phosphor-icons/react";

const CodeExplainer = ({ setSelectedFeature }) => {
  const [code, setCode] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false); 

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(explanation);
    u.onend = () => {
      setIsSpeaking(false);
    };
    return () => {
      synth.cancel();
    };
  }, [explanation]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setCode(e.target.result);
    };
    reader.readAsText(file);
  };

  const handleExplain = async () => {
    setIsLoading(true);
    const response = await fetch('http://localhost:3001/api/explain', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });
    const data = await response.json();
    setExplanation(data.explanation);
    setIsLoading(false);
  };

  const stripMarkdown = (markdown) => {
    return markdown.replace(/#+\s/g, '');
  };

  const handleSpeak = () => {
    const synth = window.speechSynthesis;
    if (isSpeaking) {
      synth.cancel();
      setIsSpeaking(false);
    } else {
      const u = new SpeechSynthesisUtterance(stripMarkdown(explanation));
      synth.speak(u);
      setIsSpeaking(true);
    }
  };

  return (
    <div className="explainer-container">
      <header className="grid-container">
        <div className="header-content" tabIndex="0" onClick={() => setSelectedFeature(null)} onKeyDown={(e) => e.key === 'Enter' && setSelectedFeature(null)}>
          <h1>Code Accessibility AI <CodeIcon size={43} color="#bb86fc" weight="bold" /></h1>
          <p>Your AI-powered partner for accessible development</p>
        </div>
        <section className="card-explainer">
          <h2>Upload Your Code</h2>
          <p>Upload a code file and I'll explain it to you in plain English.</p>
          <input type="file" id="file-upload" onChange={handleFileChange} style={{ display: 'none' }} />
          <label htmlFor="file-upload" className="button" tabIndex="0" onKeyDown={(e) => e.key === 'Enter' && document.getElementById('file-upload').click()}>Choose File</label>
        </section>
      </header>
      <main>
        {code && (
          <section className="card-explainer">
            <div className="code-header">
              <h2>Your Code</h2>
              <button onClick={handleExplain} disabled={isLoading}>
                {isLoading ? <div className="spinner" /> : 'Explain Code'}
              </button>
            </div>
            <pre><code>{code}</code></pre>
          </section>
        )}
        {explanation && (
          <section className="card-explainer">
            <div className="explanation-header">
              <h2>Explanation</h2>
              <button onClick={handleSpeak}>
                {isSpeaking ? 'Stop' : 'Speak'}
              </button>
            </div>
            <ReactMarkdown>{explanation}</ReactMarkdown>
          </section>
        )}
      </main>
    </div>
  );
};

export default CodeExplainer;