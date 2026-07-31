import React, { Fragment } from 'react';
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faIndianRupeeSign,
    faMapMarkerAlt,
    faUser,
    faPhone,
    faUtensils,
    faReceipt,
    faCreditCard,
    faTruck
} from "@fortawesome/free-solid-svg-icons";

/**
 * ConfirmOrder component displays delivery details, cart item summary, and price calculations
 * before proceeding to payment gateway.
 * @returns {JSX.Element} ConfirmOrder component layout
 */
const ConfirmOrder = () => {
    const { cartItems, deliveryInfo } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    // Calculate order price breakdown
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    let deliveryPrice = 25;
    if (itemsPrice > 200) {
        deliveryPrice = 0;
    }
    else {
        deliveryPrice = 25;
    }

    const taxPrice = Number((0.05 * itemsPrice).toFixed(2));
    const finalTotal = (itemsPrice + deliveryPrice + taxPrice).toFixed(2);

    // Store order calculation data and navigate to payment
    const processToPayment = () => {
        const data = {
            itemsPrice: itemsPrice.toFixed(2),
            deliveryPrice,
            taxPrice,
            finalTotal
        };
        sessionStorage.setItem("orderInfo", JSON.stringify(data));
        navigate("/payment");
    };

    // Full delivery address string
    const deliveryAddress = deliveryInfo
        ? `${deliveryInfo.address}, ${deliveryInfo.city}, ${deliveryInfo.stateName}, ${deliveryInfo.country} - ${deliveryInfo.postalCode}`
        : "";

    return (
        <>
            <CheckoutSteps delivery confirmOrder />

            <div className="container my-4">
                <div className="row justify-content-between">
                    {/* Left Column: Delivery Info & Cart Items */}
                    <div className="col-12 col-lg-7 col-xl-8 mb-4">

                        {/* Delivery Info Card */}
                        <div className="cartt shadow p-4 mb-4">
                            <h4 className="font-weight-bold border-bottom pb-3 mb-3">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 icon-bronze" />
                                Delivery Info
                            </h4>

                            <div className="mb-3 d-flex align-items-center">
                                <div
                                    className="rounded-circle d-flex align-items-center justify-content-center mr-3"
                                    style={{ width: "36px", height: "36px", backgroundColor: "var(--beige)", color: "var(--light-bronze)", border: "1px solid var(--border-color)" }}
                                >
                                    <FontAwesomeIcon icon={faUser} />
                                </div>
                                <div>
                                    <small className="text-muted text-uppercase d-block font-weight-bold" style={{ fontSize: "0.75rem" }}>
                                        Customer Name
                                    </small>
                                    <span className="font-weight-bold text-dark">{user && user.name}</span>
                                </div>
                            </div>

                            <div className="mb-3 d-flex align-items-center">
                                <div
                                    className="rounded-circle d-flex align-items-center justify-content-center mr-3"
                                    style={{ width: "36px", height: "36px", backgroundColor: "var(--beige)", color: "var(--light-bronze)", border: "1px solid var(--border-color)" }}
                                >
                                    <FontAwesomeIcon icon={faPhone} />
                                </div>
                                <div>
                                    <small className="text-muted text-uppercase d-block font-weight-bold" style={{ fontSize: "0.75rem" }}>
                                        Phone Number
                                    </small>
                                    <span className="font-weight-bold text-dark">{deliveryInfo && deliveryInfo.phoneNo}</span>
                                </div>
                            </div>

                            <div className="d-flex align-items-start">
                                <div
                                    className="rounded-circle d-flex align-items-center justify-content-center mr-3 flex-shrink-0 mt-1"
                                    style={{ width: "36px", height: "36px", backgroundColor: "var(--beige)", color: "var(--light-bronze)", border: "1px solid var(--border-color)" }}
                                >
                                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                                </div>
                                <div>
                                    <small className="text-muted text-uppercase d-block font-weight-bold" style={{ fontSize: "0.75rem" }}>
                                        Delivery Address
                                    </small>
                                    <span className="font-weight-bold text-dark">{deliveryAddress}</span>
                                </div>
                            </div>
                        </div>

                        {/* Cart Items Card */}
                        <div className="cartt shadow p-4">
                            <h4 className="font-weight-bold border-bottom pb-3 mb-3 d-flex align-items-center justify-content-between">
                                <span>
                                    <FontAwesomeIcon icon={faUtensils} className="mr-2 icon-bronze" />
                                    Your Cart Items
                                </span>
                                <span className="badge border rounded-pill px-3 py-2 text-dark font-weight-bold" style={{ backgroundColor: "var(--beige)" }}>
                                    {cartItems.length} Item(s)
                                </span>
                            </h4>

                            <div className="delivery-items">
                                {cartItems.map((item) => (
                                    <Fragment key={item.fooditem || item.id}>
                                        <div className="cart-item my-2 p-2 rounded border" style={{ backgroundColor: "var(--cornsilk)", borderColor: "var(--border-color)" }}>
                                            <div className="row align-items-center">
                                                <div className="col-3 col-md-2 text-center">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="img-border-round shadow"
                                                        style={{ width: "55px", height: "55px", objectFit: "cover" }}
                                                    />
                                                </div>

                                                <div className="col-5 col-md-5">
                                                    <span className="font-weight-bold text-dark d-block">{item.name}</span>
                                                    <span className="badge border rounded-pill px-2 py-1 mt-1 text-muted" style={{ backgroundColor: "var(--beige)" }}>
                                                        {item.quantity} Qty
                                                    </span>
                                                </div>

                                                <div className="col-4 col-md-5 text-right">
                                                    <div className="font-weight-bold text-dark">
                                                        {item.quantity} x <FontAwesomeIcon icon={faIndianRupeeSign} size="xs" />{item.price} ={" "}
                                                        <span className="icon-bronze font-weight-bold">
                                                            <FontAwesomeIcon icon={faIndianRupeeSign} size="xs" />
                                                            {(item.quantity * item.price).toFixed(2)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Fragment>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="col-12 col-lg-5 col-xl-4 mb-4">
                        <div className="w-100 cartt shadow p-3 sticky-top">
                            <h4 className="font-weight-bold pb-3 mb-3">
                                <FontAwesomeIcon icon={faReceipt} className="mr-2 icon-bronze" />
                                Order Summary
                            </h4>

                            <div className='inner-wrapper'>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <span className="text-dark">SubTotal</span>
                                    <span className="font-weight-bold text-dark">
                                        <FontAwesomeIcon icon={faIndianRupeeSign} size="xs" className="mr-1" />
                                        {itemsPrice.toFixed(2)}
                                    </span>
                                </div>

                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <span className="text-dark">
                                        <FontAwesomeIcon icon={faTruck} className="mr-1 text-muted" />
                                        Delivery Charges
                                    </span>
                                    <span className="font-weight-bold text-dark">
                                        {deliveryPrice === 0 ? (
                                            <span className="greenColor font-weight-bold">FREE</span>
                                        ) : (
                                            <>
                                                <FontAwesomeIcon icon={faIndianRupeeSign} size="xs" className="mr-1" />
                                                {deliveryPrice.toFixed(2)}
                                            </>
                                        )}
                                    </span>
                                </div>

                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <span className="text-dark">Taxes (5%)</span>
                                    <span className="font-weight-bold text-dark">
                                        <FontAwesomeIcon icon={faIndianRupeeSign} size="xs" className="mr-1" />
                                        {taxPrice.toFixed(2)}
                                    </span>
                                </div>

                                <hr style={{ borderColor: "var(--border-color)" }} />

                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <span className="h5 font-weight-bold text-dark mb-0">Total</span>
                                    <span className="h5 font-weight-bold greenColor mb-0">
                                        <FontAwesomeIcon icon={faIndianRupeeSign} size="sm" className="mr-1" />
                                        {finalTotal}
                                    </span>
                                </div>

                            </div>

                            <button
                                type="button"
                                className="btn btn-block py-3 font-weight-bold"
                                id="checkout_btn"
                                onClick={processToPayment}
                            >
                                <FontAwesomeIcon icon={faCreditCard} className="mr-2" />
                                Proceed to Payment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConfirmOrder;