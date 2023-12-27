import axios from "axios";  //allow to make HTTPS requests -- npm intall axios
import {
    ALL_RESTAURANTS_SUCCESS, 
    ALL_RESTAURANTS_FAIL, 
    ALL_RESTAURANTS_REQUEST, 
    CLEAR_ERRORS, 
    SORT_BY_RATINGS, 
    SORT_BY_REVIEWS,
    TOGGLE_VEG_ONLY
} from "../constants/restaurantConstant.js";

export const getRestaurants = (keyword = " ") => async(dispatch) => {  //For network access - time consuming
    try{
        dispatch({type:ALL_RESTAURANTS_REQUEST});
        let link = `/api/v1/eats/stores?keyword=${keyword}`;  //http://127.0.0.1:4000/api/v1/eats/stores
        const {data} = await axios.get(link);  // takes some to complete
        const {restaurants, count} = data;

        dispatch({type:ALL_RESTAURANTS_SUCCESS, payload:{restaurants, count}});  // dispatch all the gathered data to the rudux file
    }
    catch(error){
        dispatch({type:ALL_RESTAURANTS_FAIL, payload:error.response.data.message});
    }
};

export const sortByRatings = () => {
    return {
        type: SORT_BY_RATINGS
    };
};

export const sortByReviews = () => {
    return {
        type: SORT_BY_REVIEWS
    };
};

export const toggleVegOnly = () => (dispatch) => {  //it will check the database and show only veg so use dispatch
    dispatch({type: TOGGLE_VEG_ONLY});  
};  //redux thunk middleware

export const clearError = () => async(dispatch) => {
    dispatch({type: CLEAR_ERRORS});
};  // if the error is there after all process completed it will clear a errors 