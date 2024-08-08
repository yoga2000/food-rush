import React from "react";

import "./Orders.css";
import { url } from "../../assets/assets";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useState } from "react";

import axios from "axios";
import { assets } from "../../assets/assets";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrder = async () => {
    try {
      const response = await axios.get(`${url}` + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error");
    }
  };

  const statusHandler = async (e, orderId) => {
    const res = await axios.post(`${url}` + "/api/order/status", {
      orderId,
      status: e.target.value,
    });

    if (res.data.success) {
      await fetchAllOrder();
    }
  };

  useEffect(() => {
    fetchAllOrder();
  }, []);
  return (
    <div className=" order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ",";
                  }
                })}
              </p>
              <p className="order-item-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    "," +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.pincode}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>$ {order.amount}</p>
            <select
              onChange={(e) => statusHandler(e, order._id)}
              value={order.status}
              name=""
              id=""
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
