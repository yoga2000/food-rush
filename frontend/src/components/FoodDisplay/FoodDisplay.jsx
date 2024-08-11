import React, { useContext } from "react";

import "./FoodDisplay.css";
import { storeContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list, loading } = useContext(storeContext);
  if (loading) {
    return (
      <h1 style={{ color: "blue", textAlign: "center" }}>
        Loading the top dishes please wait...
      </h1>
    );
  }
  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (category === "All" || item.category === category) {
            return <FoodItem key={index} {...item} />;
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
