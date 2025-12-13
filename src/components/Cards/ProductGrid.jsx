import ProductCard from "./ProductCard";
import styles from "./Card.module.css";
import api from "../../config/AuthHeader"
import {useEffect, useState} from "react";

export default function ProductsGrid() {
    const [products, setProducts] = useState([]);
    useEffect(()=>{
        const fetchData = async () => {
            console.log(localStorage.getItem("token"));
            const response = await api.get("/products");
            setProducts(response.data);
        }

        fetchData();
    },[]);
    const handleChange = (e) => {
        const loadProduct = async function(){
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/products/" + e.target.value,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                body : null
            });
            setProducts(await response.json());
        }
        loadProduct();
    }
    return (<>
            <center>
                <input type={"text"} className={styles["search-container"]} placeholder={"Search..."} onChange={handleChange} />
            </center>
            <div className={styles.grid}>
                {products.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </>
    );
}
