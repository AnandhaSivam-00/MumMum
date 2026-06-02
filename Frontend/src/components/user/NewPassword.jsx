import React, {useState, useEffect} from 'react';
import {useAlert} from "react-alert";
import {useDispatch, useSelector} from "react-redux";
import {resetPassword, clearError} from "../../actions/userActions";
import {useParams, useNavigate} from "react-router-dom";

const NewPassword = () => {

    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const alert = useAlert();
    const dispatch = useDispatch();

    const {error, success} = useSelector((state) => state.forgotPassword);

    const {token} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearError());
        }
        if(success) {
            alert.success("Password Updated successfully");
            navigate("/users/login");
        }

    }, [dispatch, alert, error, success, navigate]);

    const sumbitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("password", password);
        formData.set("passwordConfirm", passwordConfirm);

        dispatch(resetPassword(token, formData));
    };

  return (
    <>
      <div className="row wrapper">
          <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={sumbitHandler}>
                  <h1 className="mb-3">Set New Password</h1>
                  <div className="form-group">
                      <label htmlFor="password_field">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password_field" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                  </div>
                  <div className="form-group">
                      <label htmlFor="confirm_password_field">Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirm_password_field" 
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                      />
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-block py-3" 
                    id="new_password_button"
                  >
                      Set New Password
                  </button>
              </form>
          </div>
      </div>
    </>
  )
}

export default NewPassword
