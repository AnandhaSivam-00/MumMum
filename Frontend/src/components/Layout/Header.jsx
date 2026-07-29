import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Routes } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../../actions/userActions";
import Search from "./Search";
import "../../App.css";
import { clearCart } from '../../actions/cartActions';
import logo from "../../Images/logo.png";
import cartIcon from "../../Icons/cart-check.svg";
import downArrow from "../../Icons/chevron-down.svg";
import personIcon from "../../Icons/person-bounding-box.svg";
import personCard from '../../Icons/person-vcard.svg';
import ordersIcon from '../../Icons/clipboard2-heart.svg'
import logoutIcon from '../../Icons/box-arrow-left.svg';


const Header = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const alert = useAlert();
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => state.auth);

    const logoutHandler = () => {
        dispatch(clearCart());
        dispatch(logout());
        alert.success("Good Bye...");
    }

    return (
        <>
            <nav className="navbar sticky-top py-2 px-3">
                <div className="container-fluid d-flex flex-wrap align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <Link to="/">
                            <img src={logo} alt="logo" className="logo" style={{ maxWidth: '5rem', height: 'auto' }} />
                        </Link>
                    </div>

                    <div className="d-flex align-items-center justify-content-end order-md-3 col-auto px-0">
                        <Link
                            to="/cart"
                            className="position-relative d-inline-block mr-2 mr-sm-3"
                            style={{ textDecoration: "none" }}
                            onClick={e => {
                                if (!user) {
                                    e.preventDefault();
                                }
                            }}
                        >
                            <button
                                className="btn"
                                id="cart"
                                disabled={cartItems.length === 0 && !user}
                            >
                                Cart
                                <img
                                    src={cartIcon}
                                    alt="cart"
                                    className="ml-1"
                                />
                            </button>
                            <span className="position-absolute badge rounded-pill cart-pill" id="cart_count">
                                {cartItems.length}
                            </span>
                        </Link>
                        {user ? (
                            <div className="dropdown d-inline-block">
                                <Link to="/"
                                    className="btn dropdown-toggle text-white d-inline-flex align-items-center p-0"
                                    type="button"
                                    id="dropDownMenuButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    style={{ textDecoration: 'none' }}
                                >
                                    <figure className="avatar avatar-nav m-0">
                                        <img src={user.avatar && user.avatar.url} alt={user && user.name} className="rounded-circle" />
                                    </figure>
                                    <span className="ml-1"><img src={downArrow} alt="DD-icon" /></span>
                                </Link>
                                <div className="dropdown-menu mt-2 dropdown-menu-right" aria-labelledby="dropDownMenuButton">
                                    <span id="person-show" className="dropdown-item-text font-weight-bold d-flex align-items-center py-2 px-3">
                                        <img src={personIcon} alt="Person" className="mr-2" />
                                        {user.name}
                                    </span>
                                    <hr className="my-1" />
                                    <Link to="/users/me" className="dropdown-item d-flex align-items-center">
                                        <img src={personCard} alt="pro-details" className="mr-2" />
                                        Profile
                                    </Link>
                                    <Link to="/eats/orders/me/myOrders" className="dropdown-item d-flex align-items-center">
                                        <img src={ordersIcon} alt="order-icon" className="mr-2" />
                                        Orders
                                    </Link>
                                    <Link to="/" className="dropdown-item text-danger d-flex align-items-center" onClick={logoutHandler}>
                                        <img src={logoutIcon} alt="logout" className="mr-2" />
                                        LogOut
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            !loading && (
                                <Link to="/users/login" className="btn ml-2 ml-sm-3" id="login_btn">
                                    Login
                                </Link>
                            )
                        )}
                    </div>

                    <div className="col-12 col-md-5 mt-2 mt-md-0 px-0 order-md-2 mx-auto">
                        {user ? (
                            <Routes>
                                <Route path="/" element={<Search />} />
                                <Route path="/eats/stores/search/:keyword" element={<Search />} />
                            </Routes>
                        ) : (
                            <div className="header-heading d-flex justify-content-start my-2 my-md-0">
                                <h1 className="brand-name mb-0">Mum Mum</h1>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );

}

export default Header
