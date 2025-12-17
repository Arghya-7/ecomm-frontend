import ProductCard from "./ProductCard";
import styles from "./Card.module.css";
import api from "../../config/AuthHeader"
import {useEffect, useState} from "react";

export default function ProductsGrid() {
    const [products, setProducts] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [page, setPage] = useState({});
    const [text, setText] = useState("");
    console.log(process.env.REACT_PAGE_SIZE);
    const [size, setSize] = useState(process.env.REACT_PAGE_SIZE || 15);
    useEffect(()=>{
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        const fetchData = async () => {
            console.log(`${process.env.REACT_APP_BACKEND_URL}/search?page=${pageNumber}&size=${size}`);
            const response = await api.get(`${process.env.REACT_APP_BACKEND_URL}/search?page=${pageNumber}&size=${size}&text=${text}`);
            setPage(response.data)
            console.log(response.data);
            setProducts(response.data.content);
        }

        fetchData();
    },[pageNumber, text]);
    const handleChange = () => {
        const text = document.getElementById("search-input").value;
        setText(text);
    }
    const goToNextPage = () => {
        setPageNumber(pageNumber => pageNumber + 1);
    }

    const goToPreviousPage = () => {
        setPageNumber(pageNumber => pageNumber - 1);
    }
    return (<>
            <center>
                <input type={"text"} className={styles["search-container"]} placeholder={"Search..."} onChange={() => handleChange()} id="search-input"/>
            </center>
            <div className={styles.grid}>
                {products.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
            <div className={styles["pagination"]}>
                <button className={styles["pageBtn"]} disabled={pageNumber === 0} onClick={goToPreviousPage}>← Previous</button>
                <span className={styles["pageInfo"]}>Page {pageNumber + 1} of {page.totalPages}</span>
                <button className={styles["pageBtn"]} disabled={pageNumber === page.totalPages - 1} onClick={goToNextPage}>Next →</button>
            </div>
        </>
    );
}
