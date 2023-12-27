import React from 'react'
import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

import Home from './components/Home';
import Menu from "./components/Menu";
import Cart from "./components/cart/Cart";
import Delivery from './components/cart/Delivery';
import Login from './components/user/Login';
import Profile from "./components/user/Profile";
import Register from './components/user/Register';
import { loadUser } from "./actions/userActions";
import store from "./store";
import UpdateProfile from './components/user/UpdateProfile';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';
import ConfirmOrder from './components/cart/ConfirmOrder';

//importing Payment
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios';
import Payment from './components/cart/Payment';
import OrderSuccess from './components/cart/OrderSuccess';
import ListOrders from './components/order/ListOrders';
import OrderDetails from './components/order/OrderDetails';
import PageNotFound from './components/Layout/PageNotFound';

const AnimatedRoutes = () => {

  const [stripeApiKey, setStripeApiKey] = useState("");


  useEffect(() => {
    store.dispatch(loadUser());

    async function getStripeApiKey() {
      const {data} = await axios.get("/api/v1/stripeapi").catch((error) => {console.log(error)});
      setStripeApiKey(data.stripeApiKey);
    }

    getStripeApiKey();
  }, []);

  const location = useLocation();

  return (
       
          <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} exact />
              <Route path="/eats/stores/search/:keyword" element={<Home />} exact />

              <Route path="/eats/stores/:id/menus" element={<Menu />} exact />
              <Route path="/cart" element={<Cart />} exact />
              <Route path="/delivery" element={<Delivery />} exact />

              <Route path="/users/login" element={<Login />} exact />
              <Route path="/users/signup" element={<Register />} exact />
              <Route path="/users/me" element={<Profile />} exact />
              <Route path="/users/me/update" element={<UpdateProfile />} exact />
              <Route path="/users/forgetPassword" element={<ForgotPassword />} exact />
              <Route path="/users/resetPassword/:token" element={<NewPassword />} exact />
              <Route path="/confirm" element={<ConfirmOrder />} />

              {/* Payment */}
              {stripeApiKey && (
                  <Route
                      path="/payment"
                      element={
                          <Elements stripe={loadStripe(stripeApiKey)}>
                              <Payment />
                          </Elements>
                      }
                  />
              )}

              <Route path="/success" element={<OrderSuccess />} />
              <Route path="/eats/orders/me/myOrders" element={<ListOrders />} />
              <Route path="/eats/orders/:id" element={<OrderDetails />} />
              <Route path="*" element={<PageNotFound />} exact />
          </Routes>
  
  )
}

export default AnimatedRoutes
