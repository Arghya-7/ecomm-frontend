import {Link, useLocation} from "react-router-dom";
import api from "../../config/ApiHeader"
import styles from "./Registration.module.css";
import OtpTimer from "../../components/OtpTimer/OtpTimer";
import {useEffect, useRef, useState} from "react";

export default function OTPVerification() {
    const location = useLocation();
    const { user} = location.state || {user : {email : ""}};
    const [verified, setVerified] = useState(false);
    const [otp, setOTP] = useState("");
    const loaded = useRef(true);
    console.log(user);
    useEffect(() => {
        if(loaded.current && user.email) {
            const sendOTPRequest = async () => {
                const response = await api.post(process.env.REACT_APP_BACKEND_URL+"/auth/registration", {
                    email: user.email,
                })
                console.log(response)
            }
            sendOTPRequest().then(res => alert("OTP sent successfully"));
            loaded.current = false;
        }
    }, [])
    const handleRegister = async (e) => {
        e.preventDefault();
        const response = await api.post(process.env.REACT_APP_BACKEND_URL+"/auth/registration/verify",{
            email: user.email,
            otp: otp,
            user : user
        });
        console.log(response.data)
        if(response && response.status === 200 && response.data === true) {
            setVerified(true);
        } else {
            setVerified(false);
        }
    }
    const handleOTPChange = () => {
        if(otp.length !== 6){
            return "OTP Should be 6 digits";
        }
        return "";
    }
    return (
        <div className={styles.container}>
            <h3>OTP Verification page</h3>
            <div>
                {!verified ? (
                    <div>
                        <h3>Please enter your 6 digit OTP</h3>
                        <OtpTimer timeout={120} email={user.email} />
                        <p>{handleOTPChange()}</p>
                        <div className={styles.centeredInput}>
                            <input type="text" className={styles.otpInput} onChange={(e) => setOTP(e.target.value)} placeholder="Enter OTP Password" />
                        </div>
                        <button type="submit" className={styles.button} onClick={handleRegister}>
                            Verify OTP
                        </button>
                    </div>) : <p className={styles.success}>Registration successful</p>}
            </div>
            <Link to="/login" className={styles.alignRight}>Login</Link>
        </div>);
}