import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import api from "../../config/AuthHeader";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import styles from "./OrderPage.css";
import OrderComponent from "../../components/OrderComponent/OrderComponent";
export default function OrderPage(){
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get(`${process.env.REACT_APP_BACKEND_URL}/orders`);
            setOrders(response.data);
            console.log(response.data);
        }
        fetchData();
    },[]);
    return (<>
        <Header />
        <div>
           <center>
               <h1>My order details</h1>
               {orders.length > 0 ?
                   orders.map(order => (
                       <div className={styles.card} key={order.id} onClick={() => navigate(`/order/${order.id}`)}>
                           <OrderComponent order={order} />
                       </div>
                   ))
                   :<div>No order found</div>}
           </center>
        </div>
        <Footer />
    </>)
}