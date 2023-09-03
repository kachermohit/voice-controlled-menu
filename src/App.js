import React, { useEffect, useState } from 'react';
import annyang from 'annyang';

const { speechSynthesis } = window;

const App = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [voiceControlEnabled, setVoiceControlEnabled] = useState(true);

  useEffect(() => {
    const commands = {
      'home': () => {
        setActiveTab('Home');
      },
      'about': () => {
        setActiveTab('About');
      },
      'services': () => {
        setActiveTab('Services');
      },
      'contact': () => {
        setActiveTab('Contact');
      },
    };

    if (voiceControlEnabled) {
      annyang.addCommands(commands);
      annyang.start();
    } else {
      annyang.removeCommands(Object.keys(commands));
      annyang.pause();
    }

    return () => {
      annyang.removeCommands(Object.keys(commands));
      annyang.abort();
    };
  }, [voiceControlEnabled]);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (voiceControlEnabled) {
      speak(activeTab);
    }
  }, [activeTab, voiceControlEnabled]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    speak(tabName);
  };

  const toggleVoiceControl = () => {
    setVoiceControlEnabled((prevEnabled) => !prevEnabled);
  };

  return (
    <div>
      <h1>Voice Controlled Menu</h1>
      <div>
        <ul>
          <li
            onClick={() => handleTabClick('Home')}
            className={activeTab === 'Home' ? 'active' : ''}
          >
            Home
          </li>
          <li
            onClick={() => handleTabClick('About')}
            className={activeTab === 'About' ? 'active' : ''}
          >
            About
          </li>
          <li
            onClick={() => handleTabClick('Services')}
            className={activeTab === 'Services' ? 'active' : ''}
          >
            Services
          </li>
          <li
            onClick={() => handleTabClick('Contact')}
            className={activeTab === 'Contact' ? 'active' : ''}
          >
            Contact
          </li>
        </ul>
        <div>
          {activeTab === 'Home' && <div>Home Content</div>}
          {activeTab === 'About' && <div>About Content</div>}
          {activeTab === 'Services' && <div>Services Content</div>}
          {activeTab === 'Contact' && <div>Contact Content</div>}
        </div>
      </div>
      <button onClick={toggleVoiceControl}>
        {voiceControlEnabled ? 'Turn Off Voice Control' : 'Turn On Voice Control'}
      </button>
    </div>
  );
};

export default App;
