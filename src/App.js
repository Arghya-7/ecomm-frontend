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
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<PrivateRoute><DashBoard /></PrivateRoute>} />
              <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
              <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
              <Route path="/features" element={<PrivateRoute><Features /></PrivateRoute>} />
              <Route path="/checkout/:productId" element={<PrivateRoute><Checkout /></PrivateRoute>} />
              <Route path="/payment/validate" element={<PrivateRoute><PaymentValidate /></PrivateRoute>} />
              <Route path="/payment" element={<PrivateRoute><Payment /></PrivateRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />
              <Route path="*" element={<Error />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
