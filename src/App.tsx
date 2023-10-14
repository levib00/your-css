import { BrowserRouter, Routes, Route, Form } from "react-router-dom";
import './App.css';
import { styles } from '../public/scripts/your-css.js';
import Listing from './components/listing.js';
import NavBar from './components/nav.js'
import Home from "./components/home.js";

function App() {

  const passStyles = () => {
    for (let style in styles) {
      if (styles.hasOwnProperty(style)) {
        return (
          <>
            <Listing style={ style } styles={ styles }/>
          </>
        )
      }
    }
  }

  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/form"  element={<Form /> } />
          <Route path="/form/:site"  element={<Form /> } />
        </Routes>
      </BrowserRouter>
      {passStyles()}
    </div>
  )
}

export default App
