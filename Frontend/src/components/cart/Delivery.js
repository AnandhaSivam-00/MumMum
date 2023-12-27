import React, {useState} from 'react';
// import {countries} from "countries-list";  //list of countries from external module
import {useNavigate} from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";
import {saveDeliveryInfo} from "../../actions/cartActions";
import CheckoutSteps from './CheckoutSteps';

import countriesList from "../../custom_json_files/Countries_States.json";

const Delivery = () => {

    // const countriesList = Object.values(countries); //create a array of country data
    const navigate = useNavigate();
    const {deliveryInfo} = useSelector((state) => state.cart);

    const [address, setAddress] = useState(deliveryInfo.address);
    const [city, setCity] = useState(deliveryInfo.city);
    const [phoneNo, setPhoneNo] = useState(deliveryInfo.phoneNo);
    const [postalCode, setPostalCode] = useState(deliveryInfo.postalCode);
    const [country, setCountry] = useState(deliveryInfo.country);
    const [stateName, setCountryStateName] = useState(deliveryInfo.stateName);
    const [countryState, setCountryState] = useState([]);

    const dispatch = useDispatch();

    const countryHandler = (e) => {
      try {
        const countryId = e.target.value;

        const countryName = countriesList.find((country) => country.country_id === countryId).country_name;
        setCountry(countryName);
        console.log(countryName);

        const getStateData = countriesList.find((country) => country.country_id === countryId).states; 

        setCountryState(getStateData);
      }
      catch(error) {
        alert("Choose the Country and State before 'Continue' ");
      }
    }


    const stateHandler = (e) => {
      try {
        const stateId = e.target.value;

        const countryStateName = countryState.find((state) => state.state_id === stateId).state_name;
        setCountryStateName(countryStateName);
        console.log(countryStateName);
      }
      catch(error) {
        alert("Choose the Country and State before 'Continue' ");
      }
    }


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveDeliveryInfo({address, city, phoneNo, postalCode, country, stateName}));
        navigate("/confirm");
    };

  return (
    <>
      <CheckoutSteps delivery />
      
      <div className="row wrapper">
          <div className="col-10 col-lg-5 shadow-lg cartt" id="address-page">
              <h1 className="mb-4 mt-4 text-center">Delivery Address</h1>
              <form onSubmit={submitHandler}>

                  <div className="form-group">
                      <label htmlFor="address_field">Address</label>
                      <input 
                        type="text" 
                        id="address_field" 
                        className="form-control" 
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)} required 
                      />
                  </div>
                  <div className="form-group">
                      <label htmlFor="city_field">City/District</label>
                      <input 
                        type="text" 
                        id="city_field" 
                        className="form-control" 
                        value={city} 
                        onChange={(e) => setCity(e.target.value)} required 
                      />
                  </div>
                  <div className="form-group">
                      <label htmlFor="phone_field">Phone No</label>
                      <input 
                        type="phone" 
                        id="phone_field" 
                        className="form-control" 
                        value={phoneNo} 
                        onChange={(e) => setPhoneNo(e.target.value)} required 
                      />
                  </div>
                  <div className="form-group">
                      <label htmlFor="postal_code_field">PIN Code</label>
                      <input 
                        type="number" 
                        id="postal_code_field" 
                        className="form-control" 
                        value={postalCode} 
                        onChange={(e) => setPostalCode(e.target.value)} required 
                      />
                  </div>
                  <div className="row form-group g-1 d-flex">
                    <div className="col-6">
                      <label htmlFor="country_field">Country</label>
                      <select
                        id="country_field" 
                        className="form-control form-select-lg mb-3" 
                        value={country}
                        onChange={(e) => countryHandler(e)} 
                        required
                      >
                        {/* countriesList.map((country) => {
                              <option key={country.name} value={country.name}>
                                  {countries.name}
                              </option>
                          }); */}
                        <option value={country}>{country ? country : "--Select--"}</option>
                        {
                          countriesList.map((getCountry, indexValue) => (
                            <option value={getCountry.country_id} key={indexValue}>{getCountry.country_name}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div className="col-6">
                      <label htmlFor="state_field">State</label>
                      <select
                        id="state_field" 
                        className="form-control form-select-lg mb-3" 
                        value={stateName} 
                        onChange={(e) => stateHandler(e)}
                      >
                        <option value={stateName}>{stateName ? stateName : "--Select--"}</option>
                        {
                          countryState.map((getState, index) => (
                            <option value={getState.state_id} key={index}>{getState.state_name}</option>
                          ))
                        }
                        {/* <option>Tamil Nadu</option>
                        <option>Kerala</option> */}
                      </select>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-block py-3" id="shipping-btn">Continue</button>
              </form>
          </div>
      </div>
    </>
  )
}

export default Delivery
