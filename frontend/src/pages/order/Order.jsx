import React, { useContext, useEffect, useState } from "react";
import "./Order.css";
import { storeContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assests/frontend_assets/assets";

const Order = () => {
  const [data, setData] = useState([]);
  const { url, token } = useContext(storeContext);

  const fetchOrder = async () => {
    try {
      const res = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      setData(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (token) {
      fetchOrder();
    }
  }, [token]);
  return (
    <div className="my-orders">
      <h2>My Orders </h2>
      <div className="container">
        {data.map((order, index) => (
          <div className="my-orders-order" key={index}>
            <img src={assets.parcel_icon} alt="" />
            <p>
              {order.items.map((item, index) => {
                if (index == order.items.length - 1) {
                  return item.name + " x " + item.quantity;
                } else {
                  return item.name + " x " + item.quantity + ",     ";
                }
              })}
            </p>
            <p>${order.amount}.00</p>
            <p>Items:{order.items.length}</p>
            <p>
              <span>&#x25cf; </span>
              <b>{order.status}</b>
            </p>
            <button onClick={fetchOrder}> Track Order</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
