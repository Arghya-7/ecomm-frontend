import styles from "./Card.module.css";
import errorImage from "../../asset/product.png";
import {useNavigate} from "react-router-dom";


export default function ProductCard({  product }) {
    const navigate = useNavigate();
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    const useNavigateToCart = function (){
        navigate("/checkout/" + product.id);
    }

    return (
        <div className={styles.card}>
            <img src={`${BACKEND_URL}/images/${product.image}`} className={styles.image} alt={errorImage} />

            <div className={styles.content}>
                <div className={styles.name}>{product.name}</div>
                <div className={styles.price}>{product.currency} {product.price}</div>
                <button className={styles.button} onClick={useNavigateToCart}>View Product</button>
            </div>
        </div>
    );
}
