import React, {useState, useEffect} from 'react';
import {useAlert} from "react-alert";
import {useDispatch, useSelector} from "react-redux";
import {updateProfile, loadUser, clearError} from "../../actions/userActions";
import {UPDATE_PROFILE_RESET} from "../../constants/userConstant";
import {useNavigate} from "react-router-dom";

const UpdateProfile = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/Images/My project.png");

    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user} = useSelector((state) => state.auth);
    const {isUpdated, loading, error} = useSelector((state) => state.user);

    useEffect(() => {
        if(user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }
        if(error) {
            alert.error(error);
            dispatch(clearError());
        }
        if(isUpdated) {
            alert.success("Updated successfully");
            dispatch(loadUser());

            navigate("/users/me");

            dispatch({type: UPDATE_PROFILE_RESET});
        }
    }, [dispatch, alert, error, navigate, isUpdated]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("avatar", avatar);

        dispatch(updateProfile(formData));
    };

    const onChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
        
    };

  return (
    <>
      <div className="row wrapper">
          <div className="col-10 col-lg-5 updateprofile">
              <form className="shadow-lg" onSubmit={submitHandler} encType="multipart/form-data">
                  <h1 className="mt-2 mb-5">Update Profile</h1>
                  <div className="form-group">
                      <label htmlFor="name_field">Name</label>
                      <input 
                        type="text"
                        className="form-control"
                        id="name_field"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                  </div>
                  
                  <div className="form-group">
                      <label htmlFor="avatar_upload">Avatar</label>
                      <div className="d-flex align-items-center">
                          <div>
                              <figure className="avatar mr-3 item-rtl">
                                  <img src={avatarPreview} className="rounded-circle" alt="avatar preview"/>
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
                    className="btn btn-block py-3 update-btn" 
                    disabled={loading ? true : false}
                  >
                      Update it
                  </button>
              </form>
          </div>
      </div>
    </>
  )
}

export default UpdateProfile
