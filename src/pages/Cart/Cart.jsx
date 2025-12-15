import styles from "./Cart.module.css";
import api from "../../config/AuthHeader";
import {useEffect, useRef, useState} from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Product from "../../components/ProductDetails/Product";
import GetUser from "../../components/GetUser/GetUser";
export default function Cart() {
    const [cart, setCart] = useState(null);
    const loaded = useRef(false);
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

    return (<div>
        <Header />
        {
             cart && cart.orderItemList.length > 0 ?
                <div className={styles.cartContainer}   >
                    <h2 className={styles.cartTitle}>Hello <GetUser /> ! Welcome to your cart </h2>
                    {cart.orderItemList.map((item) => (
                        <div key={item.productId}>
                            {
                                <div>
                                    <Product productId={item.productId} quantity={item.quantity} />
                                </div>
                            }
                        </div>

                    ))}
                </div>
                : <p className={styles.emptyCart}>Your cart is empty</p>}


        {cart && cart.orderItemList.length > 0 && (
            <div className={styles.cartSummary}>
                <div className={styles.totalText}>
                    Total: ₹{cart.totalPrice}
                </div>
                <div className={styles.button}>
                    <button>Chekout</button>
                </div>
            </div>
        )}

        <Footer />
    </div>)
}