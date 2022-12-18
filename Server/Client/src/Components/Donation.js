import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useEffect, useRef, useState } from "react";

export const Donation = () => {
    //paypal sandbox
    const DonateButton = ({ currency, amount }) => {
        const amountRef = useRef(amount);
        useEffect(() => {
            amountRef.current = amount;
        }, [amount]);
        return (
            <PayPalButtons
                // forceReRender={[currency, amount]}
                style={{ color: "black", label: "donate" }}
                fundingSource="paypal"
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: amountRef.current,
                                    breakdown: {
                                        item_total: {
                                            currency_code: currency,
                                            value: amountRef.current
                                        }
                                    }
                                },
                                items: [
                                    {
                                        name: "Musify donations",
                                        description:
                                            "This helps musify to keep ongoing.",
                                        quantity: "1",
                                        unit_amount: {
                                            currency_code: currency,
                                            value: amountRef.current
                                        },
                                        category: "DONATION"
                                    }
                                ]
                            }
                        ]
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then(function(details){
                        alert("ThankYou very much for donating to musify 🥰, "+ details.payer.name.given_name);
                    })
                }}
            />
        );
    };
    // Amount Picker
    function AmountPicker({ onAmountChange }) {
        return (
            <fieldset onChange={onAmountChange}>
                <legend>Donation Amount</legend>
                <label>
                    <input type="radio" value="5.00" defaultChecked="true" name="amount" />
                    5.00
                </label>
                <label>
                    <input type="radio" value="10.00" name="amount" id="radio-6" />
                    10.00
                </label>
                <label>
                    <input type="radio" value="15.00" name="amount" id="radio-9" />
                    15.00
                </label>
            </fieldset>
        );
    }
    function DonateForm() {
        const [amount, setAmount] = useState("5.00");
        return (
            <form className="DonateForm">
                <AmountPicker
                    onAmountChange={(e) => {
                        setAmount(e.target.value);
                    }}
                />
                <DonateButton currency="CAD" amount={amount} />
            </form>
        );
    }

    return (
        <main>
            <div id="donationContainer">
                {/* For donation illustration */}
                <div id="donationImage">
                    {/* <a href="https://www.freepik.com/free-vector/family-couple-saving-money_7732613.htm#query=donate&position=29&from_view=keyword">Image by pch.vector</a> on Freepik */}
                    {/* Image provided by www.freepik.com */}
                    <img src="https://img.freepik.com/free-vector/family-couple-saving-money_74855-5240.jpg?w=1380&t=st=1671165402~exp=1671166002~hmac=8b8ebbbe85c14478a01f7c6b43a6ce52b13e976fd43cdbfdcf8d0431446daa30" alt="donation illustration" />
                </div>
                {/* Paypal donate */}
                <div id="donateDetails">
                    <h2 id="donateTitle">Donate To Musify 🚁</h2>
                    <PayPalScriptProvider options={{
                        "client-id": "AU-vXTfev0mZxlIxqLWL_fW3jppHWiRJ1FZHgfcOOVSU5VzLW_2uwnVU-wXz0HdG5trzwfhvUJVYjIRp",
                        components: "buttons",
                        currency: "CAD"
                    }}
                    >
                        <DonateForm />
                    </PayPalScriptProvider>
                </div>

            </div>
        </main>
    )
}