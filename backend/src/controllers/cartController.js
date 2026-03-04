import Cart from "../models/CartModel.js";

export const addToCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  const existing = await Cart.findOne({ userId, productId });

  if (existing) {
    existing.quantity += 1;
    await existing.save();
    return res.json(existing);
  }

  const newItem = await Cart.create({ userId, productId });
  res.status(201).json(newItem);
};

export const getCart = async (req, res) => {
  const cart = await Cart.find({ userId: req.user._id })
    .populate("productId")
    .sort({ createdAt: -1 });

  res.json(cart);
};

export const updateCartQuantity = async (req, res) => {
  const { productId } = req.params;
  const { action } = req.body;

  const item = await Cart.findOne({
    userId: req.user._id,
    productId,
  });

  if (!item) return res.status(404).json({ message: "Not found" });

  if (action === "inc") item.quantity += 1;
  if (action === "dec") item.quantity -= 1;

  if (item.quantity <= 0) {
    await item.deleteOne();
    return res.json({ message: "Removed" });
  }

  await item.save();
  res.json(item);
};

export const removeFromCart = async (req, res) => {
  await Cart.findOneAndDelete({
    userId: req.user._id,
    productId: req.params.productId,
  });

  res.json({ message: "Removed" });
};

export const clearCart = async (req, res) => {
  await Cart.deleteMany({ userId: req.user._id });
  res.json({ message: "Cleared" });
};