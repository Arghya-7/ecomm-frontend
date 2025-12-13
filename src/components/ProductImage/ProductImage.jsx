import { useEffect, useState } from "react";
import api from "../../config/AuthHeader";

const ProductImage = ({ image }) => {
    const [src, setSrc] = useState(null);

    useEffect(() => {
        api.get(`/images/${image}`, { responseType: "blob" })
            .then(res => {
                setSrc(URL.createObjectURL(res.data));
            });
    }, [image]);

    return src ? (
        <img src={src} alt={image} />
    ) : null;
};

export default ProductImage;
