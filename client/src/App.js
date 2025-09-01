import React, { useState } from 'react';
import CodeExplainer from './components/CodeExplainer';
import VoiceCommander from './components/VoiceCommander';
import ThemeSuggester from './components/ThemeSuggester';
import { LightbulbIcon,MicrophoneStageIcon, PaletteIcon, CodeIcon } from "@phosphor-icons/react";
import themesuggester from './assests/themesuggester.png';
import explainer from './assests/explainer.png';
import voicecommander from './assests/voicecmd.png';
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
              <h1>Code Accessibility AI <CodeIcon size={43} color="#bb86fc" weight="bold" /></h1>
              <p>Your AI-powered partner for accessible development</p>
            </header>
            <main className="grid-container">
              <div className="card" tabIndex="0" onClick={() => setSelectedFeature('explainer')} onKeyDown={(e) => e.key === 'Enter' && setSelectedFeature('explainer')}>
                <div className='card-info'>
                  <h2><LightbulbIcon size={28} color="#e9bc1c" weight="fill" /> Code Explainer</h2>
                  <p>Upload a code file and I'll explain it to you in plain English.</p>
                </div>
                <div>
                  <img src={explainer} alt='codeexplainer' height={'100%'} width={'100%'}/>
                </div>
              </div>
              <div className="card" tabIndex="0" onClick={() => setSelectedFeature('commander')} onKeyDown={(e) => e.key === 'Enter' && setSelectedFeature('commander')}>
                <div className='card-info'>
                  <h2><MicrophoneStageIcon size={28} color="#3c3c39" weight="fill" /> Voice Commander</h2>
                  <p>Use your voice to generate or refactor code.</p>
                </div>
                <div>
                  <img src={voicecommander} alt='voicecommander' height={'100%'} width={'100%'}/>
                </div>
              </div>
              <div className="card" tabIndex="0" onClick={() => setSelectedFeature('themeSuggester')} onKeyDown={(e) => e.key === 'Enter' && setSelectedFeature('themeSuggester')}>
                <div className='card-info'>
                  <h2><PaletteIcon size={28} color="#A6F2D4" weight="bold" /> Theme Suggester</h2>
                  <p>Get UI theme suggestions for color-blind or visually impaired users.</p>
                </div>
                <div>
                  <img src={themesuggester} alt='themesuggester' height={'100%'} width={'100%'}/>
                </div>
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
