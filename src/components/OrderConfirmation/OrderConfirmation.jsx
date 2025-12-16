import styles from "./OrderConfirmation.module.css";
export default function OrderConfirmation({orderId, paymentId, status}) {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Order Confirmation</h2>

            <div className={styles.row}>
                <span className={styles.label}>Order ID</span>
                <span className={styles.value}>{orderId}</span>
            </div>

            <div className={styles.row}>
                <span className={styles.label}>Payment ID</span>
                <span className={styles.value}>{paymentId}</span>
            </div>

            <div className={styles.status}>
                Payment Status:
                <span className={styles.success}> {status}</span>
            </div>
        </div>
    );
}