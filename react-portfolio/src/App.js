import './App.scss';
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About';
import Contact from './components/Contact';
import Pathing from './components/Pathing';
function App() {
  return (
    <>
      <Routes>
        <Route path = "/" element={<Home />}></Route>
        <Route path = "/about" element={<About />}></Route>
        <Route path = "/contact" element={<Contact />}></Route>
        <Route path = "/pathing" element={<Pathing />}></Route>
      </Routes>
    </>
  );
}

export default App;
