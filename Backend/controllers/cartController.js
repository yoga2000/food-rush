import userModal from "../models/userModal.js";

const addToCart = async (req, res) => {
  try {
    let userData = await userModal.findById(req.body.userId);
    let cartData = userData.cartData;

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await userModal.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "  not able ad to cart" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    let userData = await userModal.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }

    await userModal.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "removed from cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: " unable to removed from cart" });
  }
};

const getCart = async (req, res) => {
  try {
    let userData = await userModal.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "unale to get the cart" });
  }
};
export { addToCart, removeFromCart, getCart };
