import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import {useLocation, useNavigate} from 'react-router-dom';
import {useEffect, useRef, useState} from "react";
import styles from "../Payment.module.css";
import api from "../../../config/AuthHeader"
import CashfreePaymentModule from "./../CashfreePaymentModule";
export default function PaymentFromCart(){
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState(null);
    const sessionStatus = useRef(false);
    const [paymentData, setPaymentData] = useState(null);

    const getUserDetails = () => {
        const getUserDetails = async () => {
            const response = await api.get(`${process.env.REACT_APP_BACKEND_URL}/users/getUserDetails`);
            setUser(response.data);
        }
        getUserDetails();
    }
    const loadCartDetails =  () => {
        const loadCartDetails = async () => {
            const response = await api.post(process.env.REACT_APP_BACKEND_URL + "/cart")
            setCart(response.data);
            console.log(response.data);
        }
        loadCartDetails();
    }

    useEffect(() => {
        if(!sessionStatus.current ){
            getUserDetails();
            loadCartDetails();
            const payment = async () => {
                sessionStatus.current = true;
                const paymentRequest = await api.post(`${process.env.REACT_APP_BACKEND_URL}/create-order-cashfree`, {
                    amount: cart.totalPrice,
                    currency: "INR",
                    mail: user.email,
                    contactNumber: user.phone
                });
                const order = await api.post(`${process.env.REACT_APP_BACKEND_URL}/orders/createFromCart/ONLINE/${paymentRequest.data.order_id}`);
                console.log(paymentRequest);
                console.log(order.data);
                setPaymentData( paymentRequest.data);
            }
            if(!sessionStatus.current && user && cart){
                payment();
            }

        }
    }, [user, cart]);

    return (<>
        <Header/>
        <center>
            { paymentData && <CashfreePaymentModule data={paymentData}/>}
        </center>
        <Footer />
    </>);
}