import {useEffect, useRef, useState} from "react";
import api from "../../config/AuthHeader"
export default function GetUser(){
    const [user, setUser] = useState({name : "Shoppers", email : "", password: ""});
    const loading = useRef(true);
    useEffect(()=>{
        const fetchData = async () => {
            if(loading.current){
                loading.current = false;
                const userLocalstorage = localStorage.getItem("user");
                if(userLocalstorage){
                    setUser(userLocalstorage);
                } else {
                    const userData = await api.get("/users/getUserDetails");
                    const user = userData.data || "Shoppers";
                    setUser(user);
                }
            }
        }
        fetchData()
    });
    return (<>{user.name.toUpperCase()}</>);
}