import React, { useEffect, useState } from "react";

import "./List.css";
import axios from "axios";
import { url } from "../../assets/assets";
import { toast } from "react-toastify";

const List = () => {
  const [list, setList] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/foods/all`);
    console.log(response.data);

    if (response.data.success) {
      setList(response.data.data);
      setLoading(false);
    } else {
      setLoading(false);
      toast.error("Error");
    }
  };

  const removeFood = async (foodId) => {
    const response = await axios.delete(`${url}/api/foods/remove/${foodId}`);
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  if (loading) {
    return <div className="list add flex-col">Loading..</div>;
  }
  return (
    <div className="list add flex-col">
      <p>All Foods list</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p onClick={() => removeFood(item._id)} className="cursor">
                x
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
