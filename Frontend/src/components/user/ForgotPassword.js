import React, {useState, useEffect} from 'react';
import {useAlert} from "react-alert";
import {useDispatch, useSelector} from "react-redux";
import {forgotPassword, clearError} from "../../actions/userActions";

const ForgotPassword = () => {

    const [email, setEmail] = useState("");

    const alert = useAlert();
    const dispatch = useDispatch();

    const {loading, message, error} = useSelector((state) => state.forgotPassword);

    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearError());
        }
        if(message) {
            alert.success(message);
        }

    }, [dispatch, alert, error, message]);

    const sumbitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("email", email);

        dispatch(forgotPassword(formData));
    };

  return (
    <>
      <div className="row wrapper">
          <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={sumbitHandler}>
                  <h1 className="mb-5" >Forgot Password</h1>
                  <div className="form-group">
                      <label htmlFor="email_field">Enter your Email ID here</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email_field" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-block py-3" 
                    id="forgot_password_button"
                    disabled={loading ? true : false}
                  >
                      Send Email
                  </button>
              </form>
          </div>
      </div>
    </>
  )
}

export default ForgotPassword
