import styles from "./Card.module.css";
import {useNavigate} from "react-router-dom";
import ProductImage from "../ProductImage/ProductImage";
import api from "../../config/AuthHeader";
import {useState} from "react";
import PopUp from "../PurchaseItemsPopUp/PopUp";


export default function ProductCard({  product }) {
    const navigate = useNavigate();
    const [displayItems, setDisplayItems] = useState(false);
    const showOrders = () => {
        setDisplayItems(true);
    }
    const useNavigateToCart = function (){
        navigate("/product/" + product.id);
    }
    const addToCart = function (){
        const addToCart = async () => {
            const response = await api.put(`${process.env.REACT_APP_BACKEND_URL}/cart/increment/${product.id}`);
            console.log(response.data);
        }

        addToCart();
        showOrders();
    }

    return (
        <div className={styles.card}>
            <center>
                <div className={styles.image}>
                    <ProductImage image={product.image}/>
                </div>
            </center>
            <div className={styles.content}>
                <div className={styles.name}>{product.name}</div>
                <div className={styles.price}>{product.currency} {product.price}</div>
                <button className={styles.button} onClick={useNavigateToCart}>View Product</button>
                <button className={styles.cartButton} onClick={addToCart} >Add to Cart</button>
                <PopUp open={displayItems} onClose={() => setDisplayItems(false)} headers="Yayyy" body={<div><ProductImage image={product.image}/><p>Item added to cart</p></div>}/>
            </div>
        </div>
    );
}

