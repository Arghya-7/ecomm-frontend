import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./pages/Dashboard/DashBoard";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Features from "./pages/Features/Features";
import Product from "./pages/Checkout/Checkout";
function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<DashBoard />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/features" element={<Features />} />
              <Route path="/checkout/:productId" element={<Product />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
