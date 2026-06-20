import { createContext, useContext, useState
    , useEffect,
 } from "react";

const CartContext = createContext();


export function CartProvider({ children }) {
const [cartItems, setCartItems] = useState(() => {
  const savedCart = localStorage.getItem("cart");

  return savedCart
    ? JSON.parse(savedCart)
    : [];
});
const [cartNotice, setCartNotice] = useState("");

const addToCart = (food) => {
  setCartItems((prev) => {
    const existingItem = prev.find(
      (item) => item._id === food._id
    );

    if (existingItem) {
      return prev.map((item) =>
        item._id === food._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      return [
        ...prev,
        { ...food, quantity: 1 },
      ];
    }
  });
  setCartNotice(`${food.name} added to cart`);
};

const increaseQuantity = (id) => {
  setCartItems((prev) =>
    prev.map((item) =>
      item._id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  );
};

const decreaseQuantity = (id) => {
  setCartItems((prev) =>
    prev
      .map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
};

const removeItem = (id) => {
  setCartItems((prev) =>
    prev.filter((item) => item._id !== id)
  );
};

const clearCart = () => {
  setCartItems([]);
};

useEffect(() => {
  localStorage.setItem(
    "cart",
    JSON.stringify(cartItems)
  );
}, [cartItems]);

useEffect(() => {
  if (!cartNotice) return undefined;

  const timeoutId = setTimeout(() => {
    setCartNotice("");
  }, 2200);

  return () => clearTimeout(timeoutId);
}, [cartNotice]);

  return (
    <CartContext.Provider
    value={{
  cartItems,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  clearCart,
  cartNotice,
}}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
