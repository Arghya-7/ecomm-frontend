import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import {useParams } from "react-router-dom";
import {useState} from "react";
import styles from "./Checkout.module.css";
import image from "../../asset/product.png";

export default function Checkout(props) {
    const {productId} = useParams();
    const getProductDetails = () => {
        const product = {
            id: productId,
            name: "Wireless Headphones",
            price: 2999,
            image: image,
            quantity: 1,
            shipping: 49,
        }
        return product;
    }
    const [product,setProduct] = useState(getProductDetails());

    const handleProductQuantityChange = (e) => {
        setProduct(product => {
            const updatedProduct = {...product};
            updatedProduct.quantity = e.target.value;
            return updatedProduct;
        })
    }

    return (
        <>
            <Header />
            <div className={styles.container}>
                <h1 className={styles.title}>Checkout Order</h1>


                {/* Product Summary */}
                <div className={styles.card}>
                    <div className={styles.productRow}>
                        <img src={product.image} alt={product.name} className={styles.image} />


                        <div className={styles.productInfo}>
                            <h2 className={styles.productName}>{product.name}</h2>
                            <p className={styles.price}>Price: ₹{product.price}</p>


                            <div className={styles.quantityRow}>
                                <span className={styles.qtyLabel}>Quantity:</span>
                                <input
                                    type="number"
                                    min="1"
                                    value={product.quantity}
                                    className={styles.qtyInput}
                                    onChange={(e) => handleProductQuantityChange(e)}
                                />
                            </div>
                        </div>
                    </div>
                </div>


                {/* Billing Summary */}
                <div className={styles.card}>
                    <h3 className={styles.sectionHeader}>Billing Summary</h3>


                    <div className={styles.row}><span>Item Total</span><span>₹{product.price * product.quantity}</span></div>
                    <div className={styles.row}><span>Shipping Charges</span><span>₹{product.shipping}</span></div>


                    <hr className={styles.divider} />


                    <div className={styles.totalRow}>
                        <span>Total Amount</span>
                        <span>₹{parseInt(product.price * product.quantity + product.shipping)}</span>
                    </div>
                </div>


                {/* Payment */}
                <button className={styles.payBtn}>Proceed to Pay</button>
            </div>
            <Footer />
        </>
    );
}