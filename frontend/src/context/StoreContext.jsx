import axios from "axios";
import { createContext, useEffect, useState } from "react";

// import { food_list } from "../assests/frontend_assets/assets";

export const storeContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "https://food-rush-3auu.onrender.com";
  const [food_list, SetFoodList] = useState([]);
  const [loading, SetLoading] = useState(true);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  axios.defaults.withCredentials = true;

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const fetchFoodList = async () => {
    const response = await axios.get(`${url}/api/foods/all`);

    if (response.data.success) {
      SetFoodList(response.data.data);
      SetLoading(false);
    } else {
      console.error("server error could not able to fetcj");
      SetLoading(false);
    }
  };

  const loadCartData = async (token) => {
    const res = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } }
    );
    setCartItems(res.data.cartData);
  };

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };
  const contextValue = {
    food_list,
    removeFromCart,
    addToCart,
    setCartItems,
    cartItems,
    getTotalCartAmount,
    url,
    token,
    setToken,
    loading,
  };

  return (
    <storeContext.Provider value={contextValue}>
      {props.children}
    </storeContext.Provider>
  );
};

export default StoreContextProvider;
