import styles from "./Card.module.css";
import {useNavigate} from "react-router-dom";
import ProductImage from "../ProductImage/ProductImage";


export default function ProductCard({  product }) {
    const navigate = useNavigate();
    const useNavigateToCart = function (){
        navigate("/checkout/" + product.id);
    }

    return (
        <div className={styles.card}>
            <div className={styles.image}>
                <ProductImage image={product.image}/>
            </div>
            <div className={styles.content}>
                <div className={styles.name}>{product.name}</div>
                <div className={styles.price}>{product.currency} {product.price}</div>
                <button className={styles.button} onClick={useNavigateToCart}>View Product</button>
                <button className={styles.cartButton} >Add to Cart</button>
            </div>
        </div>
    );
}
