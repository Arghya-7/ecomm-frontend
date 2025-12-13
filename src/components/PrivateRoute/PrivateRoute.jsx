import {Navigate} from "react-router-dom";

export default function PrivateRoute({children}) {
    const token = localStorage.getItem("token");
    const authenticate = async function (){
        if (!token) {
           return  <Navigate to="/login"/>
        }
    }
    authenticate();
    return children;
}