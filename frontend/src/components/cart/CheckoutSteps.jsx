import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faTruck, 
  faClipboardCheck, 
  faCreditCard, 
  faCheck 
} from "@fortawesome/free-solid-svg-icons";

/**
 * CheckoutSteps component renders the progress indicator stepper for order checkout.
 * Displays steps for Delivery, Confirm Order, and Payment using Bootstrap utility classes.
 * @param {Object} props Component props
 * @param {boolean} [props.delivery] Indicates delivery step active/completed
 * @param {boolean} [props.confirmOrder] Indicates confirm order step active/completed
 * @param {boolean} [props.payment] Indicates payment step active
 * @returns {JSX.Element} Checkout progress stepper layout using Bootstrap
 */
const CheckoutSteps = ({ delivery, confirmOrder, payment }) => {

  // Calculate dynamic progress bar percentage for Bootstrap progress-bar
  let progressPercent = "0%";
  if(payment) {
    progressPercent = "100%";
  }
  else if(confirmOrder) {
    progressPercent = "50%";
  }

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="position-relative my-4">
            
            {/* Bootstrap Progress Bar */}
            <div className="progress" style={{ height: "4px" }}>
              <div 
                className="progress-bar active-step" 
                role="progressbar" 
                style={{ width: progressPercent, transition: "width 0.4s ease" }} 
                aria-valuenow={payment ? 100 : confirmOrder ? 50 : 0} 
                aria-valuemin="0" 
                aria-valuemax="100"
              ></div>
            </div>

            {/* Stepper Buttons Container using Bootstrap Flex utilities */}
            <div className="d-flex justify-content-between position-absolute w-100" style={{ top: "-20px" }}>
              
              {/* Step 1: Delivery Info */}
              {delivery ? (
                <Link 
                  to="/delivery" 
                  className="d-flex flex-column align-items-center text-decoration-none"
                >
                  <div 
                    className={`rounded-circle d-flex align-items-center justify-content-center shadow-sm ${confirmOrder ? "goto-orders" : "active-step"}`} 
                    style={{ width: "42px", height: "42px" }}
                  >
                    <FontAwesomeIcon icon={confirmOrder ? faCheck : faTruck} />
                  </div>
                  <span className={`small mt-2 font-weight-bold ${confirmOrder ? "greenColor" : "header-heading"}`}>
                    Delivery Info
                  </span>
                </Link>
              ) : (
                <div className="d-flex flex-column align-items-center text-muted" style={{ cursor: "not-allowed" }}>
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center incomplete border" 
                    style={{ width: "42px", height: "42px" }}
                  >
                    <FontAwesomeIcon icon={faTruck} />
                  </div>
                  <span className="small mt-2 text-muted">Delivery Info</span>
                </div>
              )}

              {/* Step 2: Confirm Order */}
              {confirmOrder ? (
                <Link 
                  to="/confirm" 
                  className="d-flex flex-column align-items-center text-decoration-none"
                >
                  <div 
                    className={`rounded-circle d-flex align-items-center justify-content-center shadow-sm ${payment ? "goto-orders" : "active-step"}`} 
                    style={{ width: "42px", height: "42px" }}
                  >
                    <FontAwesomeIcon icon={payment ? faCheck : faClipboardCheck} />
                  </div>
                  <span className={`small mt-2 font-weight-bold ${payment ? "greenColor" : "header-heading"}`}>
                    Confirm Order
                  </span>
                </Link>
              ) : (
                <div className="d-flex flex-column align-items-center text-muted" style={{ cursor: "not-allowed" }}>
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center incomplete border" 
                    style={{ width: "42px", height: "42px" }}
                  >
                    <FontAwesomeIcon icon={faClipboardCheck} />
                  </div>
                  <span className="small mt-2 text-muted">Confirm Order</span>
                </div>
              )}

              {/* Step 3: Payment */}
              {payment ? (
                <Link 
                  to="/payment" 
                  className="d-flex flex-column align-items-center text-decoration-none"
                >
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center shadow-sm active-step" 
                    style={{ width: "42px", height: "42px" }}
                  >
                    <FontAwesomeIcon icon={faCreditCard} />
                  </div>
                  <span className="small mt-2 font-weight-bold header-heading">
                    Payment
                  </span>
                </Link>
              ) : (
                <div className="d-flex flex-column align-items-center text-muted" style={{ cursor: "not-allowed" }}>
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center incomplete border" 
                    style={{ width: "42px", height: "42px" }}
                  >
                    <FontAwesomeIcon icon={faCreditCard} />
                  </div>
                  <span className="small mt-2 text-muted">Payment</span>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;


