import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import {useLocation, useNavigate} from 'react-router-dom';
import {useEffect, useRef, useState} from "react";
import styles from "./PaymentFromCart.css";
import api from "../../../config/AuthHeader"
import CashfreePaymentModule from "./../CashfreePaymentModule";
export default function PaymentFromCart(){
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState(null);
    const [paymentFailed, setPaymentFailed] = useState(false);
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
                let paymentRequest  = null;
                if(cart.totalPrice > 0){
                    paymentRequest = await api.post(`${process.env.REACT_APP_BACKEND_URL}/create-order-cashfree`, {
                        amount: cart.totalPrice,
                        currency: "INR",
                        mail: user.email,
                        contactNumber: user.phone
                    });
                }
                console.log("Payment response comes as", paymentRequest);
                if(!paymentRequest || paymentRequest.status !== 200) {
                    setPaymentFailed(true);
                    window.alert("Payment request failed");
                } else {
                    const order = await api.post(`${process.env.REACT_APP_BACKEND_URL}/orders/createFromCart/ONLINE/${paymentRequest.data.order_id}`);
                    console.log(paymentRequest);
                    console.log(order.data);
                    setPaymentData( paymentRequest.data);
                }
            }
            if(!sessionStatus.current && user && cart && !paymentFailed){
                payment();
            }

        }
    }, [user, cart]);

    return (<>
        <Header/>
        <center>
                {paymentFailed && <h1 className={styles.failure}>Oops! Payment failed. Please try again. </h1>}
                {!paymentFailed && paymentData && <CashfreePaymentModule data={paymentData}/>}
        </center>
        <Footer />
    </>);
}