import React from 'react';
import {useNavigate} from "react-router-dom"; //allowes you to route between different routes
import {useDispatch, useSelector} from "react-redux";
import alert from '../../Icons/alert-triangle.svg';

import {
    addItemToCart, 
    removeItemFromCart, 
    updateCartQuantity
} from "../../actions/cartActions";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faIndianRupee} from "@fortawesome/free-solid-svg-icons";

const Cart = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {cartItems} = useSelector((state) => state.cart);

    const removeCartItemHandler = (id) => {
        dispatch(removeItemFromCart(id));
    };

    const increaseQty = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if(newQty > stock) {
            return;
        }
        dispatch(addItemToCart(id, newQty));
    };

    const decreaseQty = (id, quantity) => {
        if(quantity > 1) {
            const newQty = quantity - 1;
            dispatch(updateCartQuantity(id, newQty));
        }
    };

    //function to navigate to the delivery page
    const checkoutHandler = () => {
        navigate("/delivery");
    };

  return (
    <>
      {/* Conditional rendering based on cartitems */}
      {cartItems.length === 0 ? (
        <h2 className="mt-5 d-flex justify-content-between cart-item-count">
            Your Cart is Empty
            <img src={alert} alt="alert" style={{paddingRight: "1.5rem"}}/>
            </h2>
            ) : (
            <>
              {/* Display the no of items in the cart */}
              <h2 className="mt-5 d-flex justify-content-center cart-item-count">
                  Your Cart have <b style={{paddingLeft: "1.2rem"}}>{cartItems.length} {cartItems.length == 1 ? "Item" : "Items"}</b>
              </h2>

              {/* Cart Items */}
              <div className="row d-flex justify-content-between cartt">
                  <div className="col-12 col-lg-8 divide-y divide-slate-100" id="add-scroll-bar">
                      {cartItems.map((item) => (
                          <>
                            <div className="cart-items" key={item.fooditem}>
                               <div className="row">
                                   <div className="col-4 col-lg-3">
                                        <img src={item.image} alt="cart items" height="90" width="115" className="img-border-round" />
                                   </div>

                                   <div className="col-5 col-lg-3">{item.name}</div>

                                   <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                       <p id="cart_item_price">
                                           <FontAwesomeIcon icon={faIndianRupee} size="sm" />
                                           {item.price}
                                       </p>
                                   </div>

                                   <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                       <div className="d-inline stockCounter">
                                           <span className="btn btn-danger minus" onClick={() => decreaseQty(item.fooditem, item.quantity)}>-</span>
                                           <input type="number" className="form-control count d-inline" value={item.quantity} readOnly/>
                                           <span className="btn btn-primary plus" onClick={() => increaseQty(item.fooditem, item.quantity, item.stock)}>+</span>
                                       </div>
                                   </div>

                                   <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                       {/* i --> stands for icon tag */}
                                       <i className="fa fa-trash btn btn-danger" id="delete_cart_item" onClick={() => removeCartItemHandler(item.fooditem)} />
                                   </div>
                               </div>
                            </div>
                            <hr />
                          </>
                      ))}
                  </div>
                  {/* Order summary */}
                  <div className="col-12 col-lg-3 my-4">
                      <div className="shadow-lg" id="order_summary">
                          <h4>Order Summary</h4>
                          <hr />
                          <p>SubTotal :
                              <span className="order-summary-values">
                                  {/* acc --> accumulator */}
                                  {/* First it is set to 0 and add to coming items */}
                                  {cartItems.reduce((acc, item) => acc + Number(item.quantity), 0)}
                                  (Units)
                              </span>
                          </p>
                          <p>
                              Total :
                              <span className="order-summary-values">
                                  <FontAwesomeIcon icon={faIndianRupee} size="sm" />
                                  {cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}
                              </span>
                          </p>
                          <hr />
                          <button className="btn btn-primary btn-block" id="checkout_btn" onClick={checkoutHandler}>
                              Check Out
                          </button>
                      </div>
                  </div>
              </div>
            </>
        ) }
    </>
  )
}

export default Cart;
