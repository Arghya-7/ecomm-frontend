import styles from "./Error.module.css";
export default function Error() {
    return (<div className={styles.background}>
        <h1 className={styles.bodyMessage}>Oops! Page is not available</h1>
    </div>);
}