import Order from "../models/OrderModel.js";
import Cart from "../models/CartModel.js";
import Product from "../models/ProductModel.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;

    let items = [];
    let totalAmount = 0;

    const orderId = req.body.orderId || `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    if (req.body.products && req.body.products.length > 0) {
      // Direct buy bypassing cart
      const productIds = req.body.products.map(p => p.productId);
      const productsDB = await Product.find({ _id: { $in: productIds } });

      items = req.body.products.map((p) => {
        const dbProduct = productsDB.find(dbP => dbP._id.toString() === p.productId.toString());
        if (!dbProduct) throw new Error("Product not found");
        return {
          productId: p.productId,
          quantity: p.quantity,
          price: dbProduct.price,
        };
      });

      totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    } else {
      // Checkout from Cart
      const cartItems = await Cart.find({ userId }).populate("productId");

      if (!cartItems.length)
        return res.status(400).json({ message: "Cart empty" });

      items = cartItems.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.productId.price,
      }));

      totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

      await Cart.deleteMany({ userId });
    }

    const order = await Order.create({
      orderId,
      userId,
      items,
      totalAmount,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user._id })
    .populate("items.productId")
    .sort({ createdAt: -1 });

  res.json(orders);
};