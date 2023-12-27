import React, {useState, useEffect} from 'react';
import {useAlert} from "react-alert";
import {useDispatch, useSelector} from "react-redux";
import {register, clearError} from "../../actions/userActions";

const Register = () => {
    const alert = useAlert();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
        phoneNumber: "",
    });

    const {name, email, password, passwordConfirm, phoneNumber} = user;

    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/Images/My_project.png");

    const dispatch = useDispatch();

    const {isAuthenticated, error, loading} = useSelector((state) => state.auth);

    //useEffect to handle redirection and error alerts
    useEffect(() => {
        if(isAuthenticated) {
            window.location.href = "/";
        }
        if(error) {
            alert.error(error);
            dispatch(clearError());
        }
    }, [dispatch, alert, isAuthenticated, error]);

    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== passwordConfirm) {
            alert.error("Password do not Match");
            return;
        }
        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("password", password);
        formData.set("passwordConfirm", passwordConfirm);
        formData.set("phoneNumber", phoneNumber);
        formData.set("avatar", avatar);

        dispatch(register(formData));
    };

    const onChange = (e) => {
        if(e.target.name === "avatar") {
            const reader = new FileReader();
            reader.onload = () => {
                if(reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
        else {
            setUser({
                ...user, 
                [e.target.name]: e.target.value
            });
        }
    };
    
  return (
    <>
      <div className="row wrapper">
          <div className="col-10 col-lg-5 registration-form">
              <form className="shadow-lg"
               onSubmit={submitHandler} 
               encType="multipart/form-data"
               autoComplete="off"
              >
                  <h1 className="mb-3">Register</h1>
                  <div className="form-group">
                      <label htmlFor="name_field">Name</label>
                      <input 
                        type="text"
                        className="form-control"
                        id="name_field"
                        name="name"
                        value={name}
                        onChange={onChange}
                        required
                      />
                  </div>
                  <div className="form-group">
                      <label htmlFor="email_field">Email</label>
                      <input 
                        type="email"
                        className="form-control"
                        id="email_field"
                        name="email"
                        value={email}
                        autoComplete="none"
                        role="presentation"
                        onChange={onChange}
                        required
                      />
                  </div>
                  <div className="form-group">
                      <label htmlFor="password_field">Password</label>
                      <input 
                        type="password"
                        className="form-control"
                        id="password_field"
                        name="password"
                        value={password}
                        onChange={onChange}
                        required
                      />
                  </div>
                  <div className="form-group">
                      <label htmlFor="passwordConfirm_field">Password Confirm</label>
                      <input 
                        type="password"
                        className="form-control"
                        id="passwordConfirm_field"
                        name="passwordConfirm"
                        value={passwordConfirm}
                        onChange={onChange}
                        required
                      />
                  </div>
                  <div className="form-group">
                      <label htmlFor="phoneNumber_field">Phone Number</label>
                      <input 
                        type="number"
                        className="form-control"
                        id="phoneNumber_field"
                        name="phoneNumber"
                        value={phoneNumber}
                        onChange={onChange}
                      />
                  </div>
                  
                  <div className="form-group">
                      <label htmlFor="avatar_upload">Avatar</label>
                      <div className="d-flex align-items-center">
                          <div>
                              <figure className="avatar mr-3 item-rtl">
                                  <img src={avatarPreview} className="rounded-circle" alt="AP"/>
                              </figure>
                          </div>
                          <div className="custom-file">
                              <input 
                                type="file"
                                className="custom-file-input"
                                id="customFile"
                                name="avatar"
                                accept="Images/*"
                                onChange={onChange}
                              />
                              <label className="custom-file-label" htmlFor="customFile">Choose Avatar</label>
                          </div>
                      </div>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-block py-3" 
                    id="register_button"
                    disabled={loading ? true : false}
                  >
                      Register
                  </button>
              </form>
          </div>
      </div>
    </>
  )
}

export default Register
