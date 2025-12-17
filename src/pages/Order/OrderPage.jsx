import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import api from "../../config/AuthHeader";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import styles from "./OrderPage.css";
import OrderComponent from "../../components/OrderComponent/OrderComponent";
import Pagination from "../../components/Pagination/Pagination.module";
export default function OrderPage(){
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [pagination, setPagination] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        const fetchData = async () => {
            const response = await api.get(`${process.env.REACT_APP_BACKEND_URL}/orders?page=${page}&size=${size}&sort=initiatedAt,desc`);
            setOrders(response.data.content);
            setPagination(response.data)
            console.log(response.data);
        }
        fetchData();
    },[page]);

    const increasePage = () =>{
        setPage(page + 1);
    }
    const decreasePage = () =>{
        setPage(page - 1);
    }
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
               <Pagination page={page} decreasePage={decreasePage} pagination={pagination} increasePage={increasePage} />
           </center>
        </div>
        <Footer />
    </>)
}