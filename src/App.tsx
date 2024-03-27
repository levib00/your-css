import { Routes, Route, MemoryRouter } from "react-router-dom";
import './App.css';
import NavBar from './components/nav.js'
import Form from "./components/form.js";
import Home from "./components/home.js";
import About from "./components/about.js";
import Settings from "./components/settings.js";

function App() {

  return (
    <div>
      <MemoryRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/form"  element={<Form /> } />
          <Route path="/about"  element={<About /> } />
          <Route path="/settings"  element={<Settings /> } />
        </Routes>
      </MemoryRouter>
    </div>
  )
}

export default App
