import styles from "./Cart.module.css";
import api from "../../config/AuthHeader";
import {useEffect, useRef, useState} from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Product from "../../components/ProductDetails/Product";
import GetUser from "../../components/GetUser/GetUser";
import {useNavigate} from "react-router-dom";
export default function Cart() {
    const [cart, setCart] = useState(null);
    const loaded = useRef(false);
    const navigate = useNavigate();
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

    const onQuantityChange = (productId, quantity) => {
        const handleQuantityChange = async (productId, quantity) => {
            const response = await api.put(`${process.env.REACT_APP_BACKEND_URL}/cart/${productId}/${quantity}`);
            setCart(response.data);
        }
        handleQuantityChange(productId, quantity);
    }

    const handleDeleteItem = (id) => {
        const handleDelete = async () => {
            const response = await api.delete(`${process.env.REACT_APP_BACKEND_URL}/cart/${id}`);
            setCart(response.data);
        }
        handleDelete();
    }

    const handleCheckout = () => {
        navigate("/checkout");
    }

    return (<div>
        <Header />
        {
             cart && cart.orderItemList.length > 0 ?
                <div className={styles.cartContainer}   >
                    <h2 className={styles.cartTitle}>Hello <GetUser /> ! Welcome to your cart </h2>
                    {cart.orderItemList.map((item) => (
                        <div key={item.productId}>
                            {
                                <div className={styles.cartColumn}>
                                    <Product productId={item.productId} quantity={item.quantity} onQuantityChange={onQuantityChange} onItemDelete={handleDeleteItem}/>
                                </div>
                            }
                        </div>

                    ))}
                </div>
                : <p className={styles.emptyCart}>OOPS! Your cart is empty</p>}


        {cart && cart.orderItemList.length > 0 && (
            <div className={styles.cartSummary}>
                <div className={styles.totalText}>
                    Total: ₹{cart.totalPrice}
                </div>
                <div className={styles.cartButton}>
                    <button onClick={handleCheckout}>Checkout</button>
                </div>
            </div>
        )}

        <Footer />
    </div>)
}