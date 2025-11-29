import ProductCard from "./ProductCard";
import styles from "./Card.module.css";
import {useEffect, useState} from "react";

export default function ProductsGrid() {
    const [products, setProducts] = useState([]);
    useEffect(()=>{
        const fetchData = async () => {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/");
            setProducts(await response.json());
        }

        fetchData();
    },[]);

    return (
        <div className={styles.grid}>
            {products.map((p) => (
                <ProductCard key={p.id} product={p} />
            ))}
        </div>
    );
}
