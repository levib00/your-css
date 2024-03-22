import { Routes, Route, MemoryRouter } from "react-router-dom";
import './App.css';
import NavBar from './components/nav.js'
import Form from "./components/form.js";
import Home from "./components/home.js";

function App() {

  return (
    <div>
      <MemoryRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/form"  element={<Form /> } />
        </Routes>
      </MemoryRouter>
    </div>
  )
}

export default App
