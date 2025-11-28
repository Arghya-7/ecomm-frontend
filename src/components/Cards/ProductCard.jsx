import styles from "./Card.module.css";
import {useNavigate} from "react-router-dom";

export default function ProductCard({  product }) {
    const navigate = useNavigate();
    const useNavigateToCart = function (){
        navigate("/checkout/" + product.id);
    }
    return (
        <div className={styles.card}>
            <img src={product.image} className={styles.image} alt={product.name} />

            <div className={styles.content}>
                <div className={styles.name}>{product.name}</div>
                <div className={styles.price}>₹{product.price}</div>
                <button className={styles.button} onClick={useNavigateToCart}>Add to Cart</button>
            </div>
        </div>
    );
}
