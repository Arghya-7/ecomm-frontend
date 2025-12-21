import {useEffect, useRef, useState} from "react";
import api from "../../config/ApiHeader"
import styles from "./OtpTimer.module.css";
function OtpTimer({timeout, email}) {
    const [timeLeft, setTimeLeft] = useState(timeout); // 2 minutes
    const timerRef = useRef(timeout);
    useEffect(() => {
        if (timeLeft <= 0) return;

        const timerId = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const handleNewOtpRequest = async () => {
        const response = await api.post(process.env.REACT_APP_BACKEND_URL+"/auth/registration",{
            email: email,
        });
        console.log(response);
        setTimeLeft(timerRef.current);
    }
    return (
        <div>
            <p>
                Time left: {minutes}:{seconds.toString().padStart(2, "0")}
            </p>

            {timeLeft === 0 && (
                <div>
                    <p style={{ color: "red" }}>OTP expired</p>
                    <button className={styles.greenButton} onClick={handleNewOtpRequest}>New OTP</button>
                </div>
            )}
        </div>
    );
}

export default OtpTimer;