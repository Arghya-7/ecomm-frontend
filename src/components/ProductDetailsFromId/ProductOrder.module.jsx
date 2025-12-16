import api from "../../config/AuthHeader"
import {useEffect, useState} from "react";
import ProductImage from "../ProductImage/ProductImage";
export default function ProductOrderModule({productId}){
    const [product, setProduct] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get(`${process.env.REACT_APP_BACKEND_URL}/${productId}`);
            setProduct(response.data);
        }
        fetchData();
    }, [productId]);
    return (<div>{
            product && <div>
                <ProductImage image={product.image} />
                <div>Product Name : {product.name}</div>
            </div>
        }</div>)
}