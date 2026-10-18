const products = require("../src/data/products.js");
function notImplemented() {
  throw new Error("Корзина ещё не реализована. Сначала прочитайте тесты.");
}

function addToCart(cart, product, quantity) {
  const prodId = product.id;
  const actualyItemFromProducts = products.find((item) => item.id === prodId);
  const actualyItemFromCart = cart.find((item) => item.id === prodId);
  if (quantity <= 0) {
    throw new RangeError("Нельзя добавить 0 предметов");
  }
  if (
    actualyItemFromProducts.stock <
    (actualyItemFromCart?.quantity ?? 0) + quantity
  ) {
    throw new RangeError("На складе недостаточно предметов");
  }
  if (cart.map((item) => item.id).includes(prodId)) {
    actualyItemFromCart.quantity += quantity;
  } else {
    cart.push({ ...product, quantity: quantity });
  }
  return cart;
}
function changeQuantity(cart, productId, quantity) {
  const actualyItemFromProducts = products.find(
    (item) => item.id === productId,
  );
  const actualyItemFromCart = cart.find((item) => item.id === productId);
  if (!actualyItemFromProducts) {
    return cart;
  }
  if (quantity <= 0) {
    throw new RangeError("Количество не может быть меньше или равно 0");
  }

  if (actualyItemFromProducts.stock < quantity) {
    throw new RangeError("На складе недостаточно предметов");
  } else {
    cart.find((item) => item.id === productId).quantity = quantity;
  }
  return cart;
}
function removeFromCart(cart, productId) {
  const filtredCart = cart.filter((item) => item.id !== productId);
  return filtredCart;
}
function calculateCartSubtotal(cart) {
  if (cart.length === 0) return 0;
  let count = 0;
  cart.forEach((item) => (count += item.price * item.quantity));
  return count;
}
function calculateOrderTotal(cart, promo) {
  const order = {
    subtotal: 0,
    discount: 0,
    delivery: 0,
    total: 0,
  };
  order.subtotal = calculateCartSubtotal(cart);

  if (order.subtotal < 50000) {
    order.delivery = 30000;
  }
  if (promo === "SAVE10" && order.subtotal >= 20000) {
    order.discount = order.subtotal / 10;
  }

  order.total = order.subtotal - order.discount + order.delivery;
  return order;
}

const cartApi = {
  addToCart,
  changeQuantity,
  removeFromCart,
  calculateCartSubtotal,
  calculateOrderTotal,
};

if (typeof module !== "undefined") module.exports = cartApi;
if (typeof window !== "undefined") window.cartApi = cartApi;
