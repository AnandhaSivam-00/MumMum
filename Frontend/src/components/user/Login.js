import React, {useEffect, useState, useContext} from 'react';
import {Link} from "react-router-dom";
import Loader from "../Layout/Loader";
import {useAlert} from "react-alert";
import {useDispatch, useSelector} from "react-redux";
import {login, clearError} from "../../actions/userActions";
import { motion } from "framer-motion";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const alert = useAlert();
    const dispatch = useDispatch();
    const {isAuthenticated, loading, error} = useSelector((state) => state.auth);

    useEffect(() => {
        if(isAuthenticated) {
            window.location.href = "/";  //home page
            alert.success("Welcome...");
        }
        if(error) {
            alert.error(error);
            dispatch(clearError());
        }
    }, [dispatch, alert, isAuthenticated, error]);

    //Handling form submission
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

  return (
    <>
      {loading ? (<Loader />) : (
          <>
            <div 
              className="row wrapper"
              // key={1}
              // initial={{opacity: 0}}
              // animate={{opacity: 1}}
              // exit={{opacity: 0}}
            >
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-5">User Login</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input 
                              type="email" 
                              id="email_field" 
                              className="form-control" 
                              value={email} 
                              onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input 
                              type="password" 
                              id="password_field" 
                              className="form-control" 
                              value={password} 
                              onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <Link to="/users/forgetPassword" className="float-right md-4" style={{textDecoration: "none"}}>
                            <div className="login_option">
                                Forgot Password
                            </div>
                        </Link>
                        <button type="submit" className="btn btn-block py-2 new_login" id="login_btn">
                            LOGIN
                        </button>
                        <Link to="/users/signup" className="text-center mt-3 mb-2" style={{textDecoration: "none"}}>
                          <div className="row wrapper login_option">
                               <div className="col-12 col-lg-5 shadow-lg">
                                   New User
                               </div>
                          </div>
                                  
                        </Link>
                    </form>
                </div>
            </div>
          </>
      )}
    </>
  )
}

export default Login
