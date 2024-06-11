import { Routes, Route, MemoryRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavBar from './components/nav.js';
import Form from './components/form.js';
import Home from './components/home.js';
import About from './components/about.js';
import Settings from './components/settings.js';

function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Load dark mode
  useEffect(() => {
    (async () => {
      const darkModeStorage = await browser.storage.local.get('darkMode');
      setIsDarkMode(await darkModeStorage.darkMode || false);
    })();
  }, []);

  return (
    // Set dark mode class for styling
    <div className={isDarkMode ? 'top-container dark-mode' : 'top-container'}>
      <MemoryRouter>
        <header>
          <NavBar />
        </header>
        <main className='main'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/form" element={<Form /> } />
            <Route path="/about" element={<About /> } />
            <Route path="/settings" element={<Settings setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} /> } />
          </Routes>
        </main>
      </MemoryRouter>
    </div>
  );
}

export default App;
