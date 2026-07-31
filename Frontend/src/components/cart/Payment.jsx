import React, { useEffect } from 'react';
import CheckoutSteps from "./CheckoutSteps";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, clearErrors } from "../../actions/orderActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faIndianRupeeSign,
    faCreditCard,
    faLock,
    faShieldAlt,
    faCalendarAlt,
    faKey
} from "@fortawesome/free-solid-svg-icons";

import {
    useStripe,
    useElements,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement
} from "@stripe/react-stripe-js";

import { useNavigate } from "react-router-dom";
import axios from "axios";

// Stripe Element styling configuration
const options = {
    style: {
        base: {
            fontSize: "16px",
            color: "#2d261e",
            fontFamily: "'Amazon Ember', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            "::placeholder": {
                color: "#736b60"
            }
        },
        invalid: {
            color: "#c0392b"
        }
    }
};

/**
 * Payment component renders secure Stripe payment card inputs and processes payment.
 * @returns {JSX.Element} Payment component layout
 */
const Payment = () => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);
    const { cartItems, deliveryInfo, restaurant } = useSelector((state) => state.cart);
    const { error } = useSelector((state) => state.newOrder);

    useEffect(() => {
        if(error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error]);

    const order = {
        orderItems: cartItems,
        deliveryInfo,
        restaurant
    };

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    if(orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice;
        order.taxPrice = orderInfo.taxPrice;
        order.deliveryPrice = orderInfo.deliveryPrice;
        order.finalTotal = orderInfo.finalTotal;
    }

    const paymentData = {
        amount: orderInfo ? Math.round(orderInfo.finalTotal * 100) : 0 // stripe works with cents
    };

    // Submit payment handler
    const submitHandler = async (e) => {
        e.preventDefault();
        const payBtn = document.querySelector("#pay_btn");
        if(payBtn) {
            payBtn.disabled = true;
        }

        try {
            const config = {
                headers: { "Content-Type": "application/json" }
            };
            paymentData.description = "Payment for food items Purchase";
            const res = await axios.post("/api/v1/payment/process", paymentData, config);
            const clientSecret = res.data.client_secret;

            if(!stripe || !elements) {
                if(payBtn) {
                    payBtn.disabled = false;
                }
                return;
            }

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email
                    }
                }
            });

            if(result.error) {
                toast.error(result.error.message);
                if(payBtn) {
                    payBtn.disabled = false;
                }
            }
            else {
                if (result.paymentIntent.status === "succeeded") {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    };

                    dispatch(createOrder(order));
                    navigate("/success");
                }
                else {
                    toast.error("There is some issue occured while payment processing");
                    if(payBtn) {
                        payBtn.disabled = false;
                    }
                }
            }
        }
        catch (error) {
            if(payBtn) {
                payBtn.disabled = false;
            }
            if(error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            }
            else {
                toast.error("An unexpected error occurred. Please try again.");
            }
        }
    };

    return (
        <>
            <CheckoutSteps delivery confirmOrder payment />

            <div className="container my-4">
                <div className="row justify-content-center">
                    {/* Main Payment Card Column */}
                    <div className="col-12 col-md-10 col-lg-7 col-xl-6 mb-4">
                        <div className="cartt shadow p-4 p-md-5">

                            {/* Header */}
                            <div className="d-flex justify-content-center align-items-center pb-3 mb-4">
                                <h3 className="font-weight-bold mb-0">
                                    Card Info
                                </h3>
                            </div>

                            <form onSubmit={submitHandler}>
                                {/* Card Number */}
                                <div className="form-group mb-4">
                                    <label htmlFor="card_num_field" className="font-weight-bold text-dark mb-2">
                                        <FontAwesomeIcon icon={faCreditCard} className="mr-2 text-muted" />
                                        Card Number
                                    </label>
                                    <div className="p-3 border rounded bg-white" style={{ borderColor: "var(--border-color)" }}>
                                        <CardNumberElement
                                            type="text"
                                            className="form-control-plaintext p-0"
                                            id="card_num_field"
                                            options={options}
                                        />
                                    </div>
                                </div>

                                {/* Expiry Date & CVC */}
                                <div className="row">
                                    <div className="col-12 col-md-6 form-group mb-4">
                                        <label htmlFor="card_exp_field" className="font-weight-bold text-dark mb-2">
                                            <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-muted" />
                                            Card Expiry
                                        </label>
                                        <div className="p-3 border rounded bg-white" style={{ borderColor: "var(--border-color)" }}>
                                            <CardExpiryElement
                                                type="text"
                                                className="form-control-plaintext p-0"
                                                id="card_exp_field"
                                                options={options}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-6 form-group mb-4">
                                        <label htmlFor="card_cvc_field" className="font-weight-bold text-dark mb-2">
                                            <FontAwesomeIcon icon={faKey} className="mr-2 text-muted" />
                                            Card CVC
                                        </label>
                                        <div className="p-3 border rounded bg-white" style={{ borderColor: "var(--border-color)" }}>
                                            <CardCvcElement
                                                type="text"
                                                className="form-control-plaintext p-0"
                                                id="card_cvc_field"
                                                options={options}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Amount Display */}
                                <div className="p-3 mb-4 rounded d-flex justify-content-between align-items-center" style={{ backgroundColor: "var(--cornsilk)", border: "1px solid var(--border-color)" }}>
                                    <span className="font-weight-bold text-dark">Total Amount Payable</span>
                                    <span className="h5 font-weight-bold greenColor mb-0">
                                        <FontAwesomeIcon icon={faIndianRupeeSign} size="sm" className="mr-1" />
                                        {orderInfo ? orderInfo.finalTotal : "0.00"}
                                    </span>
                                </div>

                                {/* Pay Button */}
                                <button type="submit" className="btn btn-block py-3 font-weight-bold shadow-sm" id="pay_btn">
                                    <FontAwesomeIcon icon={faLock} className="mr-2" />
                                    Pay - <FontAwesomeIcon icon={faIndianRupeeSign} size="xs" /> {`${orderInfo ? orderInfo.finalTotal : '0.00'}`}
                                </button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Payment;

//Default card number used for developing --> 4242 4242 4242 4242