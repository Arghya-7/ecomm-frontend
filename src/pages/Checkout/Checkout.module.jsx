import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {useEffect, useRef, useState} from "react";
import styles from "./Checkout.module.css";
import api from "../../config/AuthHeader";
import {useNavigate} from "react-router-dom";
import PurchaseItemPopUp from "../../components/PurchaseItemsPopUp/PopUp";
import Cart from "../Cart/Cart";

export default function Checkout(){
    const navigate = useNavigate();
    const [isCashOnDelivery, setIsCashOnDelivery] = useState(false);
    const loaded = useRef(false);
    const [cart, setCart] = useState(null);
    const [openOrders, setOpenOrders] = useState(false);

    const handleOrderDisplay = () => {
        setOpenOrders(true);
    }

    useEffect(() => {
        if (!loaded.current) {
            loaded.current = true;
            const getCart = async () => {
                const response = await api.post(process.env.REACT_APP_BACKEND_URL + "/cart")
                setCart(response.data);
                console.log(response.data);
            }
            getCart();
        }
    }, [cart])

    const handlePaymentOptionChange = (option) => {
        if(option === "COD"){
            setIsCashOnDelivery(true);
        } else {
            setIsCashOnDelivery(false);
        }
    }

    const handleCodOrderCreationAndNavigation = async () => {
        const response = await api.post(`${process.env.REACT_APP_BACKEND_URL}/orders/createFromCart/CASH_ON_DELIVERY`);
        console.log(response.data);
        navigate("/order/" + response.data.id);
    }

    const handlePayment = (e) => {
        e.preventDefault();
        if(isCashOnDelivery === false) {
            navigate("/cart/payment");
        } else {
            console.log("You have chosen Cash On Delivery");
            handleCodOrderCreationAndNavigation();
        }
    }

    return (<div>
        <Header />
        <center>

            <div className={styles.checkoutContainer}>
                <div className={styles.blocks}>
                    <h1>Please Verify Your Order Details</h1>
                    {cart && <p className={styles.orderDetails}>Amount to be paid : INR {cart.totalPrice}</p>}
                    {cart && cart.user && <p className={styles.orderDetails}>User name : {cart.user.name ? cart.user.name : "NIL"}</p>}
                    {cart && cart.user && <p className={styles.orderDetails}>User Email : {cart.user.email ? cart.user.email : "NIL"}</p>}
                    {cart && cart.user && <p className={styles.orderDetails}>User Address : {cart.user.address}</p>}
                    {cart && cart.user && <p className={styles.orderDetails}>User Contact : {cart.user.phone ? cart.user.phone : "NIL"}</p>}
                    <button className={styles.paymentColor} onClick={handlePayment} > {isCashOnDelivery ? "Order now" : "Pay now"}</button>
                    <button onClick={e => navigate("/profile")}>Update Details</button>
                    <button onClick={handleOrderDisplay}>View Order</button>
                    <PurchaseItemPopUp open={openOrders} onClose={() => setOpenOrders(!openOrders)} headers="Order Details" body={<Cart />}/>
                </div>
                <div className={styles.checkoutLeft}>
                    <h2>Payment Method</h2>
                        <div className={styles.paymentMethods}>
                            <label className={styles.paymentOption}>
                                <input type="radio" name="payment" onChange={e => handlePaymentOptionChange("COD")} />
                                <span>Cash on Delivery</span>
                            </label>

                            <label className={styles.paymentOption}>
                                <input type="radio" name="payment" defaultChecked={true} onChange={e => handlePaymentOptionChange("ONLINE")} />
                                <span>UPI / Card</span>
                            </label>

                        </div>
                </div>
            </div>
        </center>
        <Footer />
    </div>)
}