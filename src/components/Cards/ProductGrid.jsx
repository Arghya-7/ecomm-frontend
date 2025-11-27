import ProductCard from "./ProductCard";
import styles from "./Card.module.css";
import images from "../../asset/product.png"

export default function ProductsGrid() {
    const products = [
        {
            id: 1,
            name: "Wireless Headphones",
            price: 1799,
            image: images,
        },
        {
            id: 2,
            name: "Smart Watch",
            price: 2499,
            image: images
        },
        {
            id: 3,
            name: "Bluetooth Speaker",
            price: 1299,
            image: images,
        },
        {
            id: 4,
            name: "Portable Charger",
            price: 999,
            image: images,
        },
    ];

    const productList = [...products, ...products, ...products, ...products, ...products, ...products, ...products];

    return (
        <div className={styles.grid}>
            {productList.map((p) => (
                <ProductCard key={p.id} product={p} />
            ))}
        </div>
    );
}
