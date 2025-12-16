import styles from "./OrderComponent.module.css";
export default function OrderComponent({order}) {
    console.log(order)


    return (
        <div className={styles.orderCard}>
            <div className={styles.topRow}>
                <span className={styles.orderId}>Order ID: {order.id}</span>
                <span className={`${styles.status} ${styles[order.paymentStatus.toLowerCase()]}`}>{order.paymentStatus}</span>
            </div>

            <div className={styles.row}>
                <span className={styles.label}>Payment ID</span>
                <span className={styles.value}>{order.paymentId ? order.paymentId : "NIL"}</span>
            </div>

            <div className={styles.row}>
                <span className={styles.label}>Payment Method</span>
                <span className={styles.value}>{order.paymentMethod}</span>
            </div>

            <div className={styles.row}>
                <span className={styles.label}>Cart ID</span>
                <span className={styles.value}>{order.cartId}</span>
            </div>

            <div className={styles.row}>
                <span className={styles.label}>Created On</span>
                <span className={styles.value}>{new Date(order.initiatedAt).toLocaleDateString()}</span>
            </div>

            <div className={styles.row}>
                <span className={styles.label}>Total Price</span>
                <span className={styles.value}>{order.totalPrice} INR</span>
            </div>
    </div>);
}