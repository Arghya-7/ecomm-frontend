import {useEffect, useState} from "react";
import api from "../../config/AuthHeader"
import ProductImage from "../ProductImage/ProductImage";
import styles from"./Product.module.css"
export default function ProductDetails({productId, quantity}) {
    const [product, setProduct] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get(`${process.env.REACT_APP_BACKEND_URL}/${productId}`);
            setProduct(response.data);
            console.log(product);
        }
        fetchData();
    },[productId])

    return (<>
        {product &&  <div  className={styles.cartItem}>
            <div className={styles.itemDetails}>
                <span>
                    <div className={styles.image}>
                        <ProductImage image={product.image}/>
                    </div>
                </span>
                <span className={styles.productDetails}>
                    <div className={styles.itemName}>Product : {product.name}</div>
                    <div className={styles.itemPrice}>Per unit price : ₹{product.price}</div>
                    <div className={styles.itemQty}>
                        Quantity : <input className={styles.itemQty} type="number" value={quantity} onChange={(e) => {
                        quantity = e.target.value;
                    }}/>
                    </div>
                    <div className={styles.itemPrice}>Total price : {quantity * product.price}</div>
                </span>
            </div>
        </div>}
        </>);
}