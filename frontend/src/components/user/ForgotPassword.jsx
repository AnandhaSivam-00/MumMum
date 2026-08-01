import React, {useState, useEffect} from 'react';
import { toast } from "sonner";
import {useDispatch, useSelector} from "react-redux";
import {forgotPassword, clearError} from "../../actions/userActions";

const ForgotPassword = () => {

    const [email, setEmail] = useState("");

    const dispatch = useDispatch();

    const {loading, message, error} = useSelector((state) => state.forgotPassword);

    useEffect(() => {
        if(error) {
            toast.error(error);
            dispatch(clearError());
        }
        if(message) {
            toast.success(message);
        }

    }, [dispatch, error, message]);

    const sumbitHandler = (e) => {
        e.preventDefault();
        dispatch(forgotPassword({ email }));
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
                        disabled={loading ? true : false}
                      />
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-block py-3" 
                    id="forgot_password_button"
                    disabled={loading ? true : false}
                  >
                      {loading ? "Sending..." : "Send Email"}
                  </button>
              </form>
          </div>
      </div>
    </>
  )
}

export default ForgotPassword
