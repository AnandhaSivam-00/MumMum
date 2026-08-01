import React, {useEffect} from 'react';
import {getRestaurants, sortByRatings, sortByReviews, toggleVegOnly} from "../actions/restaurantAction";
import Restaurant from "./Restaurant";
import Loader from "./Layout/Loader";
import Message from "./Message";
import {useDispatch, useSelector} from "react-redux";
import CountRestaurant from './CountRestaurant';
import {useParams} from "react-router-dom";
import { toast } from "sonner";


const Home = () => {
  const dispatch = useDispatch();
  const {keyword} = useParams();
  const {
    loading: restaurantsLoading, 
    error: restaurantsError, 
    restaurants,
    showVegOnly
  } = useSelector((state => state.restaurants));

  useEffect(() => {
    if(restaurantsError){
      toast.error(restaurantsError);
      return;
    }
    dispatch(getRestaurants(keyword));
  }, [dispatch, restaurantsError, keyword]);
// {} are use to Embaded with JavaScript code with JSX code
// restaurants is a object and restaurants.restaurants is used to access the object

const handleSortByRatings = () => {
  dispatch(sortByRatings());
};

const handleSortByReviews = () => {
  dispatch(sortByReviews());
};

const handleToggleVegOnly = () => {
  dispatch(toggleVegOnly());
};

  return (
    <>
      <CountRestaurant />
      {restaurantsLoading ? (
      <Loader/>) : restaurantsError ? (
      <Message variant="danger">{restaurantsError}</Message>) : (
        <>  
        <section>
          <div className="sort">
            <button className="sort_veg p-2" onClick={handleToggleVegOnly}>
              {showVegOnly ? "Show All" : "Pure Veg"}
            </button>
            <button className="sort_rev p-2" onClick={handleSortByReviews}>Sort By Reviews</button>
            <button className="sort_rate p-2" onClick={handleSortByRatings}>Sort By Ratings</button>
          </div>
          <div className="row mt-4">  
              {restaurants && restaurants.restaurants ? (
                restaurants.restaurants.map((restaurant) => !showVegOnly || (showVegOnly && restaurant.isVeg) ? (
                  <Restaurant key={restaurant._id} restaurant={restaurant} />
                ) : null )
                ) : (
                  <Message variant="info"><span id="found">No Restaurants Found </span></Message>
                )}
          </div>
        </section>
        {/* <ScrollBack /> */}
        </>
         )}
    </>
  )
}

export default Home
