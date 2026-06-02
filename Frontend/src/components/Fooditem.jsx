import React, { useEffect, useState } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faIndianRupeeSign} from "@fortawesome/free-solid-svg-icons";
// import { LazyLoadImage } from "react-lazy-load-image-component";
import {useDispatch, useSelector} from "react-redux";
import {useAlert} from "react-alert";
import {addItemToCart, updateCartQuantity, removeItemFromCart} from "../actions/cartActions";

const Fooditem = ({fooditem}) => {
    const [quantity, setQuantity] = useState(0);
    const [showButtons, setShowButtons] = useState(false);

    const dispatch = useDispatch();
    const alert = useAlert();

    const cartItems = useSelector((state) => state.cart.cartItems);
    const {user} = useSelector((state) => state.auth);
    useEffect(() => {
        const cartItem = cartItems.find((item) => item.fooditem === fooditem._id);
        if(cartItem) {
            setQuantity(cartItem.quantity);
            setShowButtons(true);
        }
    }, [cartItems, fooditem]);
    // this is not working

    const decreaseQty = () => {
        if(quantity > 1) {
            setQuantity((prevQuantity) => {
                const newQuantity = prevQuantity - 1;
                dispatch(updateCartQuantity(fooditem._id, newQuantity));
                return newQuantity;
            });
        }
        else {
            setQuantity(0);
            setShowButtons(false);
            dispatch(removeItemFromCart(fooditem._id));
        }
    };

    const increaseQty = () => {
        if(quantity < fooditem.stock) {
            setQuantity((prevQuantity) => {
                const newQuantity = prevQuantity + 1;
                if(newQuantity > 0) {
                    dispatch(addItemToCart(fooditem._id, newQuantity));
                    dispatch(updateCartQuantity(fooditem._id, newQuantity)).then(() => {
                        alert.success("Items added to the cart successfully");
                        setShowButtons(true);
                    }).catch((error) => {
                        alert.error("Failed to add items to the cart");
                    });
                }
                else {
                    alert.error("Please select a quantity greater than 0");
                }
                return newQuantity;
            });
        }
    }

    const showAddToCartButtons = () => {
        setShowButtons(true);
        increaseQty();
    };


  return (
      
      <div className="col-sm-12 col-md-6 col-lg-3 shadow-lg my-3 mb-5 p-3">
          <div className="card p-3 rounded">
              <img className="card-img-top mx-auto"
                  src={fooditem.images[0].url}
                  alt={fooditem.name}
              />
              <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{fooditem.name}</h5>
                  <p className="fooditem_des">{fooditem.description}</p>
                  <p className="card-text">
                      <FontAwesomeIcon icon={faIndianRupeeSign} size="xs" />
                      {fooditem.price}
                      <br />
                  </p>
                  {!showButtons && (
                    <button 
                      type="button" 
                      id="cart_btn"
                      className="btn btn-primary d-inline ml-4" 
                      disabled={fooditem.stock === 0}
                      onClick={showAddToCartButtons} >Add to Cart</button>)
                  }
                  {showButtons && (
                      <div className="stockCounter d-inline">
                          <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>
                          <input type="number" className="form-control count d-inline" value={quantity} readOnly/>
                          <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                      </div>
                  )}
                  <hr />
                  <p>
                      Status: <span className={fooditem.stock > 0 ? "greenColor" : "redColor"} id="stock_status">
                          {fooditem.stock > 0 ? "In Stock" : "Out of Stock"}
                        </span>
                  </p>
              </div>
          </div>
      </div>
  );
}

export default Fooditem
