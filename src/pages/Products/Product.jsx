import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import {useNavigate, useParams} from "react-router-dom";
import  {useEffect, useState} from "react";
import styles from "./Product.module.css";
import api from "../../config/AuthHeader"
import ProductImage from "../../components/ProductImage/ProductImage";

export default function Product() {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
                                                            id:null,
                                                            name: "Shoe",
                                                            description: "Shoe",
                                                            image: "img.png",
                                                            price: 500,
                                                            quantity: 1,
                                                            shipping : 30
                                                        });

    const handleProductQuantityChange = (e) => {
        setProduct((prev) => ({
            ...prev,
            quantity: Number(e.target.value)
        }));
    };

    const handleAddToCart = () => {
        const handleQuantityChange = async (productId, quantity) => {
            const response = await api.put(`${process.env.REACT_APP_BACKEND_URL}/cart/${productId}/${quantity}`);
            navigate("/cart");
        }
        handleQuantityChange(product.id, product.quantity);
    }

    useEffect(() => {
        const fetchData = async () => {
            const res = await api.get(`${process.env.REACT_APP_BACKEND_URL}/${productId}`);
            const data =  res.data;
            setProduct({...data, quantity : 1, shipping : 0});
        };

        fetchData();
    }, [productId]);

    const addToCart = async () => {
        const response = await api.put(`${process.env.REACT_APP_BACKEND_URL}/cart/${productId}/${product.quantity}`);
        return response.data;
    }
    const handlePayment = () =>{
        const data = addToCart();
        data.then(data => navigate("/checkout"));
    }


    return (
        <>
            <Header />
            <div className={styles.container}>
                <h1 className={styles.title}>Checkout Order</h1>


                {/* Product Summary */}
                <div className={styles.card}>
                    <div className={styles.productRow}>
                        <div className={styles.image}>
                            <ProductImage image={product.image}/>
                        </div>
                        <div className={styles.productInfo}>
                            <h2 className={styles.productName}>Product Name : {product.name}</h2>
                            <h2 className={styles.productDescription}>Description : {product.description}</h2>
                            <p className={styles.price}>Price: {product.currency} {product.price}</p>


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


                 Billing Summary
                <div className={styles.card}>
                    <h3 className={styles.sectionHeader}>Billing Summary</h3>


                    <div className={styles.row}><span>Item Total</span><span>{product.currency} {product.price * product.quantity}</span></div>
                    <div className={styles.row}><span>Shipping Charges</span><span>{product.currency} {product.shipping}</span></div>


                    <hr className={styles.divider} />


                    <div className={styles.totalRow}>
                        <span>Total Amount</span>
                        <span>{product.currency + " " +parseInt(product.price * product.quantity + product.shipping)}</span>
                    </div>
                </div>


                {/* Payment */}
                <button className={styles.checkoutButton} onClick={handleAddToCart}>Add to Cart</button>
                <button className={styles.payBtn} onClick={handlePayment}>Pay now</button>
            </div>
            <Footer />
        </>
    );
}