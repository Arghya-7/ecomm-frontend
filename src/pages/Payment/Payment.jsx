import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {useLocation, useNavigate} from 'react-router-dom';
import {useEffect, useRef, useState} from "react";
import styles from "./Payment.module.css";
import api from "../../config/AuthHeader"
import CashfreePaymentModule from "./CashfreePaymentModule";
import ProductImage from "../../components/ProductImage/ProductImage";

export default function Payment() {
    const navigate = useNavigate();
    const location = useLocation();
    const {productItems} = location.state || [];
    const sessionStatus = useRef(false);
    const [paymentData, setPaymentData] = useState(null);

    const calculateCost = (products) => {
        let cost = 0;
        for(let i = 0; i < products.length; i++) {
            cost += products[i].price * products[i].quantity + products[i].shipping;
        }
        return cost;
    }


    const getUserDetails = () => {
        return {
            email: "arghyadey639@gmail.com",
            name: "ARGHYA DEY",
            contactNumber: "6290103455"
        }
    }
    useEffect(() => {
        if(!productItems ) {
            navigate("/");
        } else {
            console.log(productItems);
        }
        if(!sessionStatus.current){
            const payment = async () => {
                const paymentRequest = await api.post(`${process.env.REACT_APP_BACKEND_URL}/create-order-cashfree`, {
                    amount: calculateCost(productItems),
                    currency: "INR",
                    mail: getUserDetails().email,
                    contactNumber: getUserDetails().contactNumber
                });
                console.log(paymentRequest);
                setPaymentData( paymentRequest.data);

            }
            payment();
            sessionStatus.current = true;
        }
    }, [])

    return (<>
        <Header/>
        <div className={styles.productGrid}>
            {productItems.map((item) => (
                <div className={styles.productCard} key={item.id}>
                    <span className={styles.productImage}>
                        <ProductImage image={item.image}/>
                    </span>
                    <h3 className={styles.productTitle}>Item name : {item.name}</h3>
                    <p className={styles.productPrice}>Item price : {item.price}</p>
                    <p className={styles.productPrice}>Item quantity : {item.quantity}</p>
                    <p className={styles.productPrice}>Shipping charges : {item.shipping}</p>
                </div>
            ))}
        </div>
        <center><h1>Total price = {calculateCost(productItems)}</h1></center>
        <div className={styles.payBtn}><CashfreePaymentModule data={paymentData} /></div>
        <Footer />
        </>);
}