import React from 'react';
import {Link} from "react-router-dom";


const CheckoutSteps = ({delivery, confirmOrder, payment}) => {
  return (
    <div className="checkout-progress d-flex justify-content-center mt-5">

      {/* Delivery */}

      {delivery ? (
          //Active styling part
          <Link to="shipping" className="float-right p-2">
              <div className="step active-step rounded-circle">1</div>
          </Link>
      ) : (
          <Link to="#!" disabled className="p-2">
              <div className="step incomplete rounded-circle">1</div>
          </Link>
      )}

      {/* Confirm Order */}
      {confirmOrder ? (
          //Active styling part
          <Link to="/order/confirm" className="float-right p-2">
              <div className="step active-step rounded-circle">2</div>
          </Link>
      ) : (
          <Link to="#!" disabled className="p-2">
              <div className="step incomplete rounded-circle">2</div>
          </Link>
      )}

      {/* Payment part */}
      {payment ? (
          //Active styling part
          <Link to="/payment" className="float-right p-2">
              <div className="step active-step rounded-circle">3</div>
          </Link>
      ) : (
          <Link to="#!" disabled className="p-2">
              <div className="step incomplete rounded-circle">3</div>
          </Link>
      )}
    </div>
  )
}

export default CheckoutSteps
