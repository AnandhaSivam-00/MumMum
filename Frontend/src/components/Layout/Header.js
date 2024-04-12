import React, {Fragment} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link, Route, Routes} from "react-router-dom";
import {useAlert} from "react-alert";
import {logout} from "../../actions/userActions";
import Search from "../Layout/Search";
import "../../App.css";
import { clearCart } from '../../actions/cartActions';
import logo from "../../Images/logo.png";
import cartIcon from "../../Icons/cart-check.svg";
import downArrow from "../../Icons/chevron-down.svg";
import personIcon from "../../Icons/person-bounding-box.svg";


const Header = () => {


  const {cartItems} = useSelector((state) => state.cart);
  const alert = useAlert();
  const dispatch = useDispatch();
  const {user, loading} = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(clearCart());
    dispatch(logout());
    alert.success("Good Bye...");
  }

  return (
    <>
      <nav className="navbar row sticky-top">
        <div className="row g-0 col-sm-9">
          <div className="col-4 col-sm-3 col-md-3 ml-1 row">
            <Link to="/">
               <img src={logo} alt="logo" className="logo" />
            </Link>
          </div>
          <div className="col-6 col-sm-9 mt-10 d-flex">
            {user ? (
              <Routes>
                <Route path="/" element={<Search />} />
                <Route path="/eats/stores/search/:keyword" element={<Search />} />
              </Routes>
            ) : (
              <div className="mt-2 header-heading d-flex">
                <h1>Mum Mum</h1>
              </div>
            )}
          </div>
        </div>

        <div className="col-12 col-sm-3 col-md-3 mt-4 mt-md-0 text-center">
          <Link 
           to="/cart" 
           style={{textDecoration: "none"}} 
           onClick = {e => {
             if(!user){
               e.preventDefault();
              }
            }
           }
          >
            <button 
             className="btn ml-1" 
             id="cart" 
             disabled={cartItems.length === 0 && !user} 
             >
              Cart 
              <img 
                src={cartIcon}
                alt="cart" 
              />
            </button>
            <span className="ml-0 position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light cart-pill" id="cart_count">{cartItems.length}</span>
          </Link>
          {user ? (
            <div className="ml-5 dropdown d-inline">
              <Link to="/" 
                className="btn dropdown-toogle text-white mr-4" 
                type="button" 
                id="dropDownMenuButton" 
                data-toggle="dropdown" 
                aria-haspopup="true"
                aria-expanded="false"
              >
                  <figure className="avatar avatar-nav">
                    <img src={user.avatar && user.avatar.url} alt={user && user.name} className="rounded-circle" />
                  </figure>
                  <span><img src={downArrow} alt="DD-icon" /></span>
              </Link>
              <div className="dropdown-menu mt-4" aria-labelledby="dropDownMenuButton">
                <span id="person-show">
                  <img src={personIcon} alt="Person" style={{paddingRight: "0.2rem"}}/> 
                  {user.name}
                </span>
                <hr />
                <Link to="/users/me" className="dropdown-item">
                  <img src="../../Icons/person-vcard.svg" alt="pro-details" className="py-2" style={{paddingRight: "0.3rem"}} />
                  Profile
                </Link>
                <Link to="/eats/orders/me/myOrders" className="dropdown-item">
                  <img src="../../Icons/clipboard2-heart.svg" alt="order-icon" className="py-2" style={{paddingRight: "0.2rem"}} />
                  Orders
                </Link>
                <Link to="/" className="dropdown-item text-danger" onClick={logoutHandler}>
                  <img src="../../Icons/box-arrow-left.svg" alt="logout" className="py-2" style={{paddingRight: "0.3rem"}} />
                  LogOut
                </Link>
              </div>
            </div>
            ) : (
              !loading && (
                <Link to="/users/login" className="btn ml-4" id="login_btn">
                  Login
                </Link>
              )
            )
          }
        </div>
      </nav>
    </>
  );
  
}

export default Header
