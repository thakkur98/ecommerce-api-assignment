import React, { createContext, useContext, useState } from "react";

const CartContext = createContext<any>(null);

export const CartProvider = ({ children }: any) => {
  const [cart, setCart] = useState<any[]>([]);
  const [ordersCount, setOrdersCount] = useState(0);
  const [discountCodes, setDiscountCodes] = useState<string[]>( ["SAVE10", "FLAT50", "WELCOME20"]);

  const addItem = (item: any) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      if (exists) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const increaseQty = (id: number) => {
    setCart((prev) =>
      prev.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p))
    );
  };

  const decreaseQty = (id: number) => {
    setCart((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, qty: p.qty - 1 } : p))
        .filter((p) => p.qty > 0)
    );
  };

  const checkout = (code?: string) => {
    let total = cart.reduce((acc, c) => acc + c.price * c.qty, 0);
    let discountApplied = 0;
    if (code && discountCodes.includes(code)) {
      discountApplied = total * 0.1; 
      total -= discountApplied;
      setDiscountCodes((prev) => prev.filter((c) => c !== code));
    }
    setOrdersCount((prev) => prev + 1);
    if ((ordersCount + 1) % 3 === 0) {
      const newCode = `DISCOUNT-${Math.floor(Math.random() * 10000)}`;
      setDiscountCodes((prev) => [...prev, newCode]);
      alert(`Congrats! You got a new discount code: ${newCode}`);
    }
    setCart([]);
    return { total, discountApplied };
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        increaseQty,
        decreaseQty,
        checkout,
        discountCodes, 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
