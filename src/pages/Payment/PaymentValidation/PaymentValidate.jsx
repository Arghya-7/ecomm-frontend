import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import style from "./PaymentValidation.module.css";

export default function PaymentValidate() {
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const navigate = useNavigate();
    const orderId = params.get("order_id");
    const [state, setState] = useState("Loading")

    const isSuccess = (message) => {
        return message === "success";
    }

    useEffect(() => {
        console.log("Payment Redirected Locally!");
        console.log("Order ID:", orderId);
        const updateStatus = async () => {
            const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/check-order-status`,{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body : JSON.stringify({
                    orderId: orderId
                })
            });
            const dataJSON = await data.json();
            console.log(dataJSON.order_status);
            if(dataJSON.order_status === "PAID") {
                setState("success");
            } else {
                setState(dataJSON.order_status);
            }
        }
        updateStatus();
    }, [orderId]);

    return (
        <div>
            <Header />
                <div className={style.container}>
                    <h3>Your order id is {orderId}</h3>
                    <h3>{isSuccess(state) ? <div className={style.success}>Payment successful</div>
                        : <div className={style.failure}>Payment failed.</div>}</h3>
                    <button onClick={() => navigate("/")} className={style.blueButton}>Go to home</button>
                </div>
            <Footer />
        </div>
    );
}
