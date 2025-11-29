import {useEffect, useState} from "react";

export default function Clock() {
    const [time, setTime] = useState(new Date());
    const calculateHour = (hour) => {
        if(hour == 12) return 12;
        else if(hour >= 12) return (hour % 12).toString().padStart(2, '0');
        else return hour.toString().padStart(2, '0');
    }
    const getTime = (time) => {
        const amOrPm = time.getHours() >= 12 ? "PM" : "AM";
        return calculateHour(time.getHours())+ " : " + time.getMinutes().toString().padStart(2, "0") + " : " + time.getSeconds().toString().padStart(2, "0") + " " + amOrPm;
    }
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        },1000);
        return () => {clearInterval(interval);};
    }, [])
    return (<>
        <h4>Your current time is : {getTime(time)}</h4>
    </>)
}