import React, { useContext, useEffect, useState } from "react";

import "./PlaceOrder.css";
import { storeContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(storeContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    const orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];

        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    try {
      const res = await axios.post(url + "/api/order/place", orderData, {
        headers: { token },
      });
      console.log("Response:", res.data); // Log response for debugging

      if (res.data.success) {
        const { session_url } = res.data;
        window.location.replace(session_url);
      } else {
        alert("Error in payment gateway: " + res.data.message);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order. Please try again later.");
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);
  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First Name"
          />
          <input
            required
            type="text"
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            id=""
            placeholder="Last Name"
          />
        </div>
        <input
          required
          type="email"
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          id=""
          placeholder="Email"
        />
        <input
          required
          type="text"
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          id=" "
          placeholder="Street"
        />
        <div className="multi-fields">
          <input
            required
            type="text"
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            id=""
            placeholder="City"
          />
          <input
            required
            type="text"
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            id=""
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            required
            type="text"
            name="pincode"
            onChange={onChangeHandler}
            value={data.pincode}
            id=""
            placeholder="Pincode"
          />
          <input
            required
            type="text"
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            id=""
            placeholder="Country"
          />
        </div>
        <input
          required
          type="text"
          name="phone"
          value={data.phone}
          onChange={onChangeHandler}
          id=""
          placeholder="Phone"
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
