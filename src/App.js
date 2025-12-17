import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./pages/Dashboard/DashBoard";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Features from "./pages/Features/Features";
import Error from "./pages/Error/Error";
import Payment from "./pages/Payment/Payment";
import Product from "./pages/Products/Product";
import PaymentValidate from "./pages/Payment/PaymentValidation/PaymentValidate";
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import OTPVerification from "./pages/Registration/OTPVerification";
import {ToastContainer} from "react-toastify";
import Logout from "./pages/Logout/Logout";
import Cart from "./pages/Cart/Cart";
import PaymentFromCart from "./pages/Payment/PaymentFromCart/PaymentFromCart";
import Checkout from "./pages/Checkout/Checkout.module";
import UserProfile from "./pages/UserProfile/UserProfile.module";
import OrderDetails from "./pages/OrderDetails/OrderDetails.module";
import OrderPage from "./pages/Order/OrderPage";
import PayButton from "./components/Paybutton/PayButton";
function App() {
  return (
      <BrowserRouter>
          <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              pauseOnHover
          />
          <PayButton />
          <Routes>
              <Route path="/" element={<PrivateRoute><DashBoard /></PrivateRoute>} />
              <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
              <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
              <Route path="/features" element={<PrivateRoute><Features /></PrivateRoute>} />
              <Route path="/product/:productId" element={<PrivateRoute><Product /></PrivateRoute>} />
              <Route path="/payment/validate" element={<PrivateRoute><PaymentValidate /></PrivateRoute>} />
              <Route path="/payment" element={<PrivateRoute><Payment /></PrivateRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/cart" element={<PrivateRoute><Cart/></PrivateRoute>} />
              <Route path="/cart/payment" element={<PrivateRoute><PaymentFromCart/></PrivateRoute>} />
              <Route path="/checkout" element={<PrivateRoute><Checkout/></PrivateRoute>} />
              <Route path="/order/:orderId" element={<PrivateRoute><OrderDetails /></PrivateRoute>} />
              <Route path="/order" element={<PrivateRoute><OrderPage /></PrivateRoute>} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/register/verify" element={<OTPVerification />} />
              <Route path="*" element={<Error />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
