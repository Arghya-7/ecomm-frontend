import styles from "./Card.module.css";
export default function ProductCard({ product }) {
    return (
        <div className={styles.card}>
            <img src={product.image} className={styles.image} alt={product.name} />

            <div className={styles.content}>
                <div className={styles.name}>{product.name}</div>
                <div className={styles.price}>₹{product.price}</div>
                <button className={styles.button}>Add to Cart</button>
            </div>
        </div>
    );
}
