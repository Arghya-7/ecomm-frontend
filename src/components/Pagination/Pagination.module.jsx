import styles from "./Pagination.module.css";
export default function Pagination({page, decreasePage, pagination, increasePage}){
    return (<div className={styles["pagination"]}>
            <button className={styles["pageBtn"]} disabled={page === 0} onClick={decreasePage}>← Previous</button>
            <span className={styles["pageInfo"]}>Page {page + 1} of {pagination.totalPages}</span>
            <button className={styles["pageBtn"]} disabled={page === pagination.totalPages - 1} onClick={increasePage}>Next →</button>
        </div>);
}