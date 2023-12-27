import React, {useEffect} from 'react';
import ChechoutSteps from "../cart/CheckoutSteps";
import {useAlert} from"react-alert";
import {useDispatch, useSelector} from "react-redux";
import {createOrder, clearErrors} from "../../actions/orderActions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faIndianRupeeSign} from "@fortawesome/free-solid-svg-icons";

import {
    useStripe, 
    useElements, 
    CardNumberElement, 
    CardExpiryElement,
    CardCvcElement
} from "@stripe/react-stripe-js";

import {useNavigate} from "react-router-dom";
import axios from "axios";

const options = {
    styles: {
        base: {fontSize: "16px"},
        invalid: {color: "red"},
    }
};

const Payment = () => {

    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user} = useSelector((state) => state.auth);
    const {cartItems, deliveryInfo, restaurant} = useSelector((state) => state.cart);
    const {error} = useSelector((state) => state.newOrder);

    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, error]);

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
        amount: Math.round(orderInfo.finalTotal * 100)  //stripe works with cents
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        document.querySelector("#pay_btn").disabled = true;
        let res;
        try {
            const config = {
                headers: { "Content-Type": "application/json" }
            };
            paymentData.description = "Payment for food items Purchase";
            res = await axios.post("/api/v1/payment/process", paymentData, config);
            const clientSecret = res.data.client_secret;

            if (!stripe || !elements) {
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

            if (result.error) {
                alert.error(result.error.message);
                document.querySelector("#pay_btn").disabled = false;
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
                    alert.error("There is some issue occured while payment processing");
                }
            }
        }
        catch (error) {
            document.querySelector("#pay_btn").disabled = false;
            alert.error(error.response.data.message);
        }
    };

  return (
    <>
      <ChechoutSteps delivery confirmOrder payment />
      <div className="row wrapper">
          <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                  <h1 className="m-4">Card Info</h1>
                  <div className="form-group">
                      <label htmlFor="card_num_field">Card Number</label>
                      <CardNumberElement
                        type="text"
                        className="form-control"
                        id="card_num_field"
                        options={options} 
                      />
                  </div>
                  <div className="form-group">
                      <label htmlFor="card_exp_field">Card Expiry</label>
                      <CardExpiryElement
                        type="text"
                        className="form-control"
                        id="card_exp_field"
                        options={options} 
                      />
                  </div>
                  <div className="form-group">
                      <label htmlFor="card_cvc_field">Card CVC</label>
                      <CardCvcElement
                        type="text"
                        className="form-control"
                        id="card_cvc_field"
                        options={options} 
                      />
                  </div>
                  <button type="submit" className="btn btn-block py-3" id="pay_btn">
                      Pay - <FontAwesomeIcon icon={faIndianRupeeSign} size="xss" /> {`${orderInfo && orderInfo.finalTotal}`}
                  </button>
              </form>
          </div>
      </div>
    </>
  )
};

export default Payment


//Default card number used for developing --> 4242 4242 4242 4242