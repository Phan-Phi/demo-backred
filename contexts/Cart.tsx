import { useLocalStorage } from "react-use";
import React, { createContext, useCallback, useEffect, useState } from "react";

type CartProps = {
  cart: any;
  totalPrice: number;
  addProductItem: (obj: any) => void;
  updateProductItem: (productId: string | number, quantity: any) => void;
  deleteProductItem: (productId: string | number) => void;
  isExported: any;
  setIsExported: any;
};

const defaultState = {
  cart: [],
  totalPrice: 0,
  addProductItem: () => {},
  updateProductItem: () => {},
  deleteProductItem: () => {},
  isExported: null,
  setIsExported: () => {},
};

export const CartContext = createContext<CartProps>(defaultState);

function CartProvider({ children }: { children: React.ReactNode }) {
  const [isExported, setIsExported] = useLocalStorage("is_exported", null);

  const [storedCart, setStoredCart] = useLocalStorage<any>("cart-of-user", []);
  const [cart, setCart] = useState(storedCart);

  const [totalProduct, setTotalProduct] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const result = cart.reduce((total: number, item: any) => {
      return total + item.price * item.quantity;
    }, 0);

    setTotalPrice(result);
  }, [cart]);

  const addProductItem = useCallback((newItem: any) => {
    setCart((prevItem: any) => {
      const isExisted = prevItem.some((item: any) => {
        return item.id === newItem.id;
      });

      if (isExisted) {
        setStoredCart([...prevItem]);
        return [...prevItem];
      }

      setStoredCart([...prevItem, newItem]);
      return [...prevItem, newItem];
    });
  }, []);

  const updateProductItem = useCallback(
    (productId: number | string, quantity: number) => {
      const newData = cart.map((item: any) => {
        if (item.id === productId)
          return {
            ...item,
            quantity: quantity,
          };
        return item;
      });
      setStoredCart(newData);
      setCart(newData);
    },
    [cart]
  );

  const deleteProductItem = useCallback((productId: number | string) => {
    setCart((prevItems: any) => {
      const result = prevItems.filter((item: any) => item.id !== productId);

      setStoredCart(result);
      return result;
    });
  }, []);

  const values = {
    cart,
    totalPrice,
    totalProduct,
    addProductItem,
    updateProductItem,
    deleteProductItem,
    setIsExported,
    isExported,
  };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
}

export default CartProvider;
