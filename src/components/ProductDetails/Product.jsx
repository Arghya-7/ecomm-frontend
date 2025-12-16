import {useEffect, useState} from "react";
import api from "../../config/AuthHeader"
import ProductImage from "../ProductImage/ProductImage";
import styles from"./Product.module.css"
export default function ProductDetails({productId, quantity, onQuantityChange, onItemDelete}) {
    const [product, setProduct] = useState(null);
    const [itemQuantity, setItemQuantity] = useState(quantity);
    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get(`${process.env.REACT_APP_BACKEND_URL}/${productId}`);
            setProduct(response.data);
            console.log(product);
        }
        fetchData();
    },[productId])

    const handleQuantityChange = (e) => {
        if(e.target.value > 0) {
            setItemQuantity(e.target.value);
            onQuantityChange(productId, e.target.value);
        }
    }

    const handleDelete = () => {
        onItemDelete(productId);
    }

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
                        Quantity : <input className={styles.itemQty} type="number" value={itemQuantity} onChange={handleQuantityChange} />
                    </div>
                    <button className={styles.deleteCart} onClick={handleDelete}>Delete Item</button>
                    <div className={styles.itemPrice}>Total price : {itemQuantity * product.price}</div>
                </span>
            </div>
        </div>}
        </>);
}