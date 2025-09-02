import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {CodeIcon } from "@phosphor-icons/react";

const VoiceCommander = ({ setSelectedFeature }) => { 
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  const [generatedCode, setGeneratedCode] = useState('');

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      return alert('Your browser does not support speech recognition.');
    }
  }, [browserSupportsSpeechRecognition]);

  const handleToggleRecording = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  const handleGenerate = async () => {
    const response = await fetch('http://localhost:3001/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ command: transcript }),
    });
    const data = await response.json();
    setGeneratedCode(data.generatedCode);
  };

  const handleRefactor = async () => {
    const response = await fetch('http://localhost:3001/api/refactor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ command: transcript, code: '' }), 
    });
    const data = await response.json();
    setGeneratedCode(data.refactoredCode);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
  };

  return (
    <div>
      <header className="header-content" tabIndex="0" onClick={() => setSelectedFeature(null)} onKeyDown={(e) => e.key === 'Enter' && setSelectedFeature(null)}>
        <h1 style={{ textAlign: 'center' }}>Code Accessibility AI <CodeIcon size={43} color="#bb86fc" weight="bold" /></h1>
        <h3 style={{ textAlign: 'center' }}>Your AI-powered partner for accessible development</h3>
      </header>
      <div className="card-voice">
        <div style={{ textAlign: 'center' }}>
          <h2>Voice Commander</h2>
          <p>Use your voice to generate or refactor code.</p>
        </div>
        <div className="voice-controls">
          <button onClick={handleToggleRecording}>
            {listening ? 'Stop Recording' : 'Start Recording'}
          </button>
          <input
            type="text"
            value={transcript}
            readOnly
            placeholder="Your command will appear here"
          />
        </div>
        <div className="code-actions">
          <button onClick={handleGenerate}>Generate Code</button>
          <button onClick={handleRefactor}>Refactor Code</button>
        </div>
        {generatedCode && (
          <div className="card-voice">
            <div className="generated-code-header">
              <h2>Generated Code</h2>
              <button onClick={handleCopy}>Copy</button>
            </div>
            <SyntaxHighlighter language="javascript" style={atomDark}>
              {generatedCode}
            </SyntaxHighlighter>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceCommander;