import { useState, useEffect} from "react";
export default function Greeting() {
    const [date, setDate] = useState(new Date());
    useEffect(() => {
        const id = setTimeout(() => {
            setDate(new Date());
        }, 1000);
        return () => clearTimeout(id);
    }, [date]);
    const getMessage = (hour) => {

        if (hour >= 5 && hour < 12) return "Good morning";
        if (hour >= 12 && hour < 17) return "Good afternoon";
        if (hour >= 17 && hour < 21) return "Good evening";
        return "Good night";
    }

    return (<>
        <center>
            <h1>{getMessage(date.getHours())} Shoppers</h1>
            <h1>Thank you for visiting our site</h1>
        </center>
    </>)
}