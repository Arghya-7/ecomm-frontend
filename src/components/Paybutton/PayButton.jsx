import styles from "./PayButton.css";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../../config/AuthHeader";
export default function PayButton(props) {
    const [state, setState] = useState(false);
    const [lastCallDone, setLastCallDone] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get(process.env.REACT_APP_BACKEND_URL + "/cart");
            return response.data;
        }
        const id = setInterval(() => {
            const cart = fetchData().then((response) => {
                console.log(response);
                if(response && response.orderItemList && response.orderItemList.length > 0) {
                    console.log(response);
                    setState(true);
                } else {
                    setState(false);
                }
            });
        },4000);

        return () => {clearInterval(id);};
    },[state])
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/cart");
    }
    return (state &&
        <div className="pay-button" onClick={handleClick}>
            Buy
        </div>
    );
}