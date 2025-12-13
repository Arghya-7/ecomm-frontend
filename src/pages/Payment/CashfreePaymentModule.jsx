export default function CashfreePaymentModule({data}){
    const payNow = async () => {
        console.log(data);
        if (!window.Cashfree) {
            alert("Cashfree SDK not loaded!");
            return;
        }

        const cashfree = new window.Cashfree({ mode: "sandbox" });

        cashfree.checkout({
            paymentSessionId: data.payment_session_id,
            returnUrl: `http://localhost:3000/payment/validate?order_id=${data.order_id}`
        });
    };

    return (<>
        <span onClick={payNow}>Pay now</span>
    </>);
}