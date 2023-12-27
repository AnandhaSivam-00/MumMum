import React, {useEffect} from 'react';
import {useSelector, useDispatch} from"react-redux";
import {useParams} from "react-router-dom";
import {getMenus} from "../actions/menuAction";
import {getRestaurants} from "../actions/restaurantAction";
import Fooditem from "./Fooditem";
import {setRestaurantId} from "../actions/cartActions";
import Loader from "../components/Layout/Loader";

const Menu = (storeId) => {

    const {id} = useParams();
    const dispatch = useDispatch();

    const {menus, loading, error} = useSelector((state) => state.menus);

    dispatch(setRestaurantId(id));

    useEffect(() => {
        dispatch(getMenus(id));
        dispatch(getRestaurants());
    }, [dispatch, id, storeId]);


  return (
    <div>
      {loading ? (<Loader />) : 
      error ? (<p>Error: {error}</p>) : 
      menus && menus.length > 0 ? ( menus.map((menu) => (
          <div key={menu._id}>
              <div>
              <p className="menu_category">{menu.category}</p><hr />
              </div>
              {menu.items && menu.items.length > 0 ? (
                  <div className="row mt-4">
                      {menu.items.map((fooditem) => (
                          <Fooditem key={fooditem._id} fooditem={fooditem} />
                      )
                      )}
                  </div>
              ) : (<p>No Food Items Available</p>)}
          </div>
      )) ) : (<p>No Menus Available</p>)}
    </div>
  );
};

export default Menu
