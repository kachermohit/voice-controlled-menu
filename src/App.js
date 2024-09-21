import React, { useEffect, useState } from 'react';
import annyang from 'annyang';

const { speechSynthesis } = window;

const App = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [voiceControlEnabled, setVoiceControlEnabled] = useState(true);
  const [hoveredTab, setHoveredTab] = useState(null); // To track the hover state

  // Effect for voice control setup and cleanup
  useEffect(() => {
    const commands = {
      'home': () => setActiveTab('Home'),
      'about': () => setActiveTab('About'),
      'services': () => setActiveTab('Services'),
      'contact': () => setActiveTab('Contact')
    };

    // Add or remove voice commands based on voiceControlEnabled
    if (voiceControlEnabled) {
      annyang.addCommands(commands);
      annyang.start();
    } else {
      annyang.removeCommands(Object.keys(commands));
      annyang.pause();
    }

    // Cleanup on component unmount
    return () => {
      annyang.removeCommands(Object.keys(commands));
      annyang.abort();
    };
  }, [voiceControlEnabled]);

  // Effect to speak the active tab when voiceControlEnabled changes
  useEffect(() => {
    if (voiceControlEnabled) {
      speak(activeTab);
    }
  }, [activeTab, voiceControlEnabled]);

  // Function to speak using SpeechSynthesisUtterance
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  // Function to handle tab clicks and speak the tab name
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    speak(tabName);
  };

  // Function to toggle voice control
  const toggleVoiceControl = () => {
    setVoiceControlEnabled(prevEnabled => !prevEnabled);
  };

  // Dynamic styles for the menu items
  const getTabStyle = (tabName) => {
    let baseStyle = {
      padding: '10px 30px',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    };
  
    if (tabName === activeTab) {
      return { ...baseStyle, backgroundColor: 'white', color: 'black' };
    } else if (tabName === hoveredTab) {
      return { ...baseStyle, backgroundColor: 'lightgray', color: 'black' };
    } else {
      return { ...baseStyle, backgroundColor: '#333', color: 'white' };
    }
  };
  
  return (
    <div>
      <nav style={styles.nav}>
        <ul style={styles.menu}>
          <li
            style={{ ...getTabStyle('Home')}}
            onClick={() => handleTabClick('Home')}
            onMouseEnter={() => setHoveredTab('Home')}
            onMouseLeave={() => setHoveredTab(null)}
          >
            Home
          </li>
          <li
            style={{ ...getTabStyle('About')}}
            onClick={() => handleTabClick('About')}
            onMouseEnter={() => setHoveredTab('About')}
            onMouseLeave={() => setHoveredTab(null)}
          >
            About
          </li>
          <li
            style={{ ...getTabStyle('Services')}}
            onClick={() => handleTabClick('Services')}
            onMouseEnter={() => setHoveredTab('Services')}
            onMouseLeave={() => setHoveredTab(null)}
          >
            Services
          </li>
          <li
            style={{ ...getTabStyle('Contact')}}
            onClick={() => handleTabClick('Contact')}
            onMouseEnter={() => setHoveredTab('Contact')}
            onMouseLeave={() => setHoveredTab(null)}
          >
            Contact
          </li>
          <li
            style={{ ...getTabStyle('Button'), marginLeft: 'auto', }}  
            // Add marginLeft to push it to the right
            onClick={toggleVoiceControl}  // Fix: Call the function correctly
            onMouseEnter={() => setHoveredTab('Button')}
            onMouseLeave={() => setHoveredTab(null)}
          >
           {voiceControlEnabled ? 'Turn Off Voice Control' : 'Turn On Voice Control'}
          </li>
        </ul>
      </nav>

      {/* Main Body Content */}
      <div style={styles.content}>
        {activeTab === 'Home' && (
          <section style={styles.section}>
            <h2>Home</h2>
            <p>Welcome to the Home Page. Discover more about us.</p>
          </section>
        )}
        {activeTab === 'About' && (
          <section style={styles.section}>
            <h2>About</h2>
            <p>Learn more about our mission, values, and team.</p>
          </section>
        )}
        {activeTab === 'Services' && (
          <section style={styles.section}>
            <h2>Services</h2>
            <p>Explore the variety of services we offer to help your business grow.</p>
          </section>
        )}
        {activeTab === 'Contact' && (
          <section style={styles.section}>
            <h2>Contact</h2>
            <p>Get in touch with us for any inquiries or support.</p>
          </section>
        )}
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; 2024 Voice Controlled App. All rights reserved.</p>
      </footer>
    </div>
  );
};

// Basic inline styles for simplicity
const styles = {
  nav: {
    backgroundColor: '#333',
  },
  menu: {
    listStyleType: 'none',
    display: 'flex',
    alignItems: 'center',  // Center vertically
    margin: 0,
    padding: 0,
  },
  content: {
    padding: '20px',
    minHeight: '300px',
  },
  section: {
    marginTop: '20px',
  },
  footer: {
    textAlign: 'center',
    backgroundColor: '#333',
    color: '#fff',
    position: 'fixed',
    bottom: 0,
    width: '100%',
  }
};

export default App;
