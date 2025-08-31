import React, { useState } from 'react';
import CodeExplainer from './components/CodeExplainer';
import VoiceCommander from './components/VoiceCommander';
import ThemeSuggester from './components/ThemeSuggester';
import './App.css';

function App() {
  const [selectedFeature, setSelectedFeature] = useState(null);

  const renderFeature = () => {
    switch (selectedFeature) {
      case 'explainer':
        return <CodeExplainer setSelectedFeature={setSelectedFeature} />;
      case 'commander':
        return <VoiceCommander setSelectedFeature={setSelectedFeature} />;
      case 'themeSuggester':
        return <ThemeSuggester setSelectedFeature={setSelectedFeature} />;
      default:
        return (
          <div>
            <header className="header-content-home">
              <h1>Code Accessibility AI </h1>
              <p>Your AI-powered partner for accessible development</p>
            </header>
            <main className="grid-container">
              <div className="card" tabIndex="0" onClick={() => setSelectedFeature('explainer')} onKeyDown={(e) => e.key === 'Enter' && setSelectedFeature('explainer')}>
                <h2>Code Explainer</h2>
                <p>Upload a code file and I'll explain it to you in plain English.</p>
              </div>
              <div className="card" tabIndex="0" onClick={() => setSelectedFeature('commander')} onKeyDown={(e) => e.key === 'Enter' && setSelectedFeature('commander')}>
                <h2>Voice Commander</h2>
                <p>Use your voice to generate or refactor code.</p>
              </div>
              <div className="card" tabIndex="0" onClick={() => setSelectedFeature('themeSuggester')} onKeyDown={(e) => e.key === 'Enter' && setSelectedFeature('themeSuggester')}>
                <h2>Theme Suggester</h2>
                <p>Get UI theme suggestions for color-blind or visually impaired users.</p>
              </div>
            </main>
          </div>
        );
    }
  };

  return (
    <div className="App">
      {renderFeature()}
    </div>
  );
}

export default App;
