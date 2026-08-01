import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIndianRupeeSign,
  faArrowLeft,
  faUser,
  faPhone,
  faMapMarkerAlt,
  faCreditCard,
  faUtensils,
  faCheckCircle,
  faClock,
  faReceipt,
  faExclamationTriangle,
  faBox
} from "@fortawesome/free-solid-svg-icons";

import Loader from "../Layout/Loader";
import { getOrderDetails, clearErrors } from "../../actions/orderActions";

/**
 * OrderDetails component renders the detailed view of a user's food order.
 * Includes delivery info, order items, payment info, status, and pricing summary.
 * @returns {JSX.Element} OrderDetails component layout
 */
const OrderDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, error, order = {} } = useSelector((state) => state.orderDetails);

  const { deliveryInfo, orderItems, paymentInfo, user, finalTotal, orderStatus, createdAt } = order || {};

  useEffect(() => {
    dispatch(getOrderDetails(id));
    if(error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, id, error]);

  // Construct full delivery address string
  const deliveryDetails = deliveryInfo && 
    `${deliveryInfo.address}, ${deliveryInfo.city}, ${deliveryInfo.stateName}, ${deliveryInfo.country} - ${deliveryInfo.postalCode}`;

  // Check payment status
  const isPaid = paymentInfo && paymentInfo.status === "succeeded" ? true : false;

  // Check delivery status
  const isDelivered = orderStatus && String(orderStatus).includes("Delivered");

  // Calculate order price breakdown safely
  const itemsSubtotal = order.itemsPrice 
    ? Number(order.itemsPrice).toFixed(2)
    : (orderItems && orderItems.length > 0
      ? orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)
      : "0.00");

  const deliveryFee = order.deliveryPrice !== undefined && order.deliveryPrice !== null
    ? Number(order.deliveryPrice).toFixed(2)
    : (Number(itemsSubtotal) > 200 ? "0.00" : "25.00");

  const taxAmount = order.taxPrice !== undefined && order.taxPrice !== null
    ? Number(order.taxPrice).toFixed(2)
    : (Number(itemsSubtotal) * 0.05).toFixed(2);

  const grandTotal = finalTotal || order.finalTotal || (Number(itemsSubtotal) + Number(deliveryFee) + Number(taxAmount)).toFixed(2);

  // Format order date
  const formattedDate = createdAt 
    ? new Date(createdAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    : null;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container-fluid order-details-container">
          {/* Back Navigation Button */}
          <div className="my-3">
            <Link to="/eats/orders/me/myOrders" className="back-to-orders-btn">
              <FontAwesomeIcon icon={faArrowLeft} />
              <span>Back to My Orders</span>
            </Link>
          </div>

          {/* Header Card */}
          <div className="order-header-card shadow-sm">
            <div className="row align-items-center">
              <div className="col-12 col-md-6 mb-3 mb-md-0">
                <h1 className="order-header-title">Order #{order._id}</h1>
                {formattedDate && (
                  <p className="order-header-date mb-0">
                    <FontAwesomeIcon icon={faClock} className="mr-2" />
                    Placed on: {formattedDate}
                  </p>
                )}
              </div>

              {/* Status Overview Cards */}
              <div className="col-12 col-md-6">
                <div className="row g-2">
                  <div className="col-6">
                    <div className="status-badge-card">
                      <div className="status-label">Payment</div>
                      <div className={`status-value ${isPaid ? "greenColor" : "redColor"}`}>
                        <FontAwesomeIcon icon={isPaid ? faCheckCircle : faExclamationTriangle} />
                        <span>{isPaid ? "PAID" : "NOT PAID"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="status-badge-card">
                      <div className="status-label">Order Status</div>
                      <div className={`status-value ${isDelivered ? "greenColor" : "redColor"}`}>
                        <FontAwesomeIcon icon={isDelivered ? faCheckCircle : faBox} />
                        <span>{orderStatus || "Processing"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="row">
            {/* Left Column: Delivery & Items */}
            <div className="col-12 col-lg-8 mb-4">
              {/* Delivery Information */}
              <div className="order-card shadow-sm p-4 mb-4">
                <h4 className="card-subtitle-heading mb-3">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 icon-bronze" />
                  Delivery Details
                </h4>

                <div className="info-item-row">
                  <div className="info-icon-wrapper">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <div className="info-content">
                    <label>Customer Name</label>
                    <span>{user && user.name}</span>
                  </div>
                </div>

                <div className="info-item-row">
                  <div className="info-icon-wrapper">
                    <FontAwesomeIcon icon={faPhone} />
                  </div>
                  <div className="info-content">
                    <label>Phone Number</label>
                    <span>{deliveryInfo && deliveryInfo.phoneNo}</span>
                  </div>
                </div>

                <div className="info-item-row">
                  <div className="info-icon-wrapper">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                  </div>
                  <div className="info-content">
                    <label>Delivery Address</label>
                    <span>{deliveryDetails}</span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="order-card shadow-sm p-4">
                <h4 className="card-subtitle-heading mb-3">
                  <FontAwesomeIcon icon={faUtensils} className="mr-2 icon-bronze" />
                  Ordered Items ({orderItems ? orderItems.length : 0})
                </h4>

                <div className="ordered-items-list mt-3">
                  {orderItems &&
                    orderItems.map((item) => (
                      <div key={item.fooditem || item._id} className="order-item-card d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="order-item-img mr-3"
                          />
                          <div>
                            <span className="order-item-title">{item.name}</span>
                            <div className="mt-1">
                              <span className="qty-badge">{item.quantity} Item(s)</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="font-weight-bold text-dark">
                            <FontAwesomeIcon icon={faIndianRupeeSign} size="xs" className="mr-1" />
                            {(item.quantity * item.price).toFixed(2)}
                          </div>
                          <small className="text-muted">
                            (<FontAwesomeIcon icon={faIndianRupeeSign} size="xs" />{item.price} each)
                          </small>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="col-12 col-lg-4 mb-4">
              <div className="order-summary-card shadow-sm p-4">
                <h4 className="card-subtitle-heading mb-3">
                  <FontAwesomeIcon icon={faReceipt} className="mr-2 icon-bronze" />
                  Order Summary
                </h4>

                <div className="summary-row">
                  <span>Items Subtotal</span>
                  <span>
                    <FontAwesomeIcon icon={faIndianRupeeSign} size="xs" className="mr-1" />
                    {itemsSubtotal}
                  </span>
                </div>

                <div className="summary-row">
                  <span>Delivery Charges</span>
                  <span>
                    <FontAwesomeIcon icon={faIndianRupeeSign} size="xs" className="mr-1" />
                    {deliveryFee}
                  </span>
                </div>

                <div className="summary-row">
                  <span>Taxes (5%)</span>
                  <span>
                    <FontAwesomeIcon icon={faIndianRupeeSign} size="xs" className="mr-1" />
                    {taxAmount}
                  </span>
                </div>

                <hr className="my-3" style={{ borderColor: "var(--border-color)" }} />

                <div className="summary-total-row">
                  <span>Total Amount</span>
                  <span className="greenColor">
                    <FontAwesomeIcon icon={faIndianRupeeSign} size="sm" className="mr-1" />
                    {grandTotal}
                  </span>
                </div>

                {paymentInfo && paymentInfo.id && (
                  <div className="mt-4 pt-3 border-top" style={{ borderColor: "var(--border-color)" }}>
                    <div className="text-muted small">
                      <FontAwesomeIcon icon={faCreditCard} className="mr-1 icon-bronze" />
                      Payment Ref: <span className="text-dark font-weight-bold">{paymentInfo.id}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetails;