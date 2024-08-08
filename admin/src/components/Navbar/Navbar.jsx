import React from "react";

import { assets } from "../../assets/assets";

import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <p className="heading">
        FoodRush Admin <Panel></Panel>{" "}
      </p>
      <img className="profile" src={assets.profile_image} alt="" />
    </div>
  );
};

export default Navbar;
