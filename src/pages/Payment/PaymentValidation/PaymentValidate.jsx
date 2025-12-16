import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import style from "./PaymentValidation.module.css";
import api from "../../../config/AuthHeader"
import OrderConfirmation from "../../../components/OrderConfirmation/OrderConfirmation";

export default function PaymentValidate() {
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const navigate = useNavigate();
    const paymentId = params.get("order_id");
    const [order, setOrder] = useState("");
    const [state, setState] = useState("Loading")

    const isSuccess = (message) => {
        return message === "success";
    }

    useEffect(() => {
        console.log("Payment Redirected Locally!");
        console.log("Order ID:", paymentId);
        const updateStatus = async () => {
            const data = await api.post(`${process.env.REACT_APP_BACKEND_URL}/check-order-status`,{
                        orderId: paymentId
                    });
            const orderResponse = await api.get(`${process.env.REACT_APP_BACKEND_URL}/orders/byPaymentId/${paymentId}`);
            setOrder(orderResponse.data);
            const dataJSON = data.data;
            console.log(dataJSON);
            if(dataJSON && dataJSON.order_status === "PAID") {
                setState("success");
            } else {
                setState("Failed");
            }
        }
        updateStatus();
    }, [paymentId]);

    return (
        <div>
            <Header />
                <div className={style.container}>
                    <OrderConfirmation paymentId={paymentId} orderId={order.id} status={isSuccess(state) ? "Successful" : "Error" } />
                    <span>
                        <button onClick={() => navigate("/")} className={style.blueButton}>Go to home</button>
                        <button className={style.blueButton} onClick={() => navigate("/order/" + order.id)} >View Order</button>
                    </span>
                </div>
            <Footer />
        </div>
    );
}
