import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./pages/Dashboard/DashBoard";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Features from "./pages/Features/Features";
import Error from "./pages/Error/Error";
import Payment from "./pages/Payment/Payment";
import Checkout from "./pages/Checkout/Checkout";
import PaymentValidate from "./pages/Payment/PaymentValidation/PaymentValidate";
function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<DashBoard />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/features" element={<Features />} />
              <Route path="/checkout/:productId" element={<Checkout />} />
              <Route path="/payment/validate" element={<PaymentValidate />} />
              <Route path="/payment" element={ <Payment />} />
              <Route path="*" element={<Error />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
