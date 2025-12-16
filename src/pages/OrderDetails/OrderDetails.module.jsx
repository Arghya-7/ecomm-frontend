import styles from "./OrderDetails.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {useEffect, useRef, useState} from "react";
import Order from "../../JSON/Order"
import api from "../../config/AuthHeader"
import {useNavigate, useParams} from "react-router-dom";
import ProductImage from "../../components/ProductImage/ProductImage";
import ProductOrderModule from "../../components/ProductDetailsFromId/ProductOrder.module";
export default function OrderDetails(){
    const navigate = useNavigate();
    const {orderId} = useParams();
    console.log(orderId);
    const [order, setOrder] = useState(Order);
    const [orderDetails, setOrderDetails] = useState([]);
    const loaded = useRef(false);

    useEffect(()=>{
        const loadOrderDetails = async (orderId)=>{
            loaded.current = true;
            const response = await api.get(`${process.env.REACT_APP_BACKEND_URL}/orders/${orderId}`);
            setOrder(response.data);
            console.log(order);
        }
        if(!loaded.current){
            loadOrderDetails(orderId);
        }
    }, [orderId]);




    return (<div>
        <Header />
            <div className={styles.container}>
                <div className={styles.card}>
                    <h2 className={styles.title}>Order Details</h2>

                    {/* Order Meta */}
                    <div className={styles.section}>
                        <div className={styles.row}>
                            <span>Order ID</span>
                            <span>{order.id}</span>
                        </div>
                        <div className={styles.row}>
                            <span>Payment ID</span>
                            <span>{order.paymentId}</span>
                        </div>
                        <div className={styles.row}>
                            <span>Status</span>
                            <span className={styles.success}>{order.paymentStatus}</span>
                        </div>
                    </div>

                    {/* Items */}
                    <div className={styles.section}>
                        <h3 className={styles.subtitle}>Items</h3>

                        {order.orderItemList.map(item => (
                            <div className={styles.item} key={item.id}>

                                <div className={styles.itemInfo}>
                                    <ProductOrderModule productId={item.productId} />
                                    <p>Qty: {item.quantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Price Summary */}
                    <div className={styles.section}>
                        <h3 className={styles.subtitle}>Price Summary</h3>

                        <div className={styles.row}>
                            <span>Subtotal</span>
                            <span>₹{order.subtotal || 0}</span>
                        </div>
                        <div className={styles.row}>
                            <span>Tax</span>
                            <span>₹{order.tax || 0}</span>
                        </div>
                        <div className={styles.row}>
                            <span>Shipping</span>
                            <span>₹{order.shipping || 0}</span>
                        </div>

                        <div className={`${styles.row} ${styles.total}`}>
                            <span>Total</span>
                            <span>₹{order.totalPrice}</span>
                        </div>
                    </div>
                </div>
            </div>
        <center>
            <button className={styles.goToHomeButton} onClick={() => navigate("/")}>Go to Home</button>
        </center>
        <Footer />
    </div>)
}