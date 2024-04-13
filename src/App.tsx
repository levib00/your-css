import { Routes, Route, MemoryRouter } from 'react-router-dom';
import './App.css';
import { useEffect, useState } from 'react';
import NavBar from './components/nav.js';
import Form from './components/form.js';
import Home from './components/home.js';
import About from './components/about.js';
import Settings from './components/settings.js';

function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const darkModeStorage = await browser.storage.local.get('darkMode');
      setIsDarkMode(await darkModeStorage.darkMode || false);
    })();
  }, []);

  return (
    <div className={isDarkMode ? 'dark-mode' : ''}>
      <MemoryRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/form" element={<Form /> } />
          <Route path="/about" element={<About /> } />
          <Route path="/settings" element={<Settings setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} /> } />
        </Routes>
      </MemoryRouter>
    </div>
  );
}

export default App;
