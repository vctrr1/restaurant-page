"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

export interface CartProducts
  extends Pick<Product, "name" | "price" | "id" | "imageUrl"> {
  quantity: number;
}

export interface IcartContext {
  isOpen: boolean;
  products: CartProducts[];
  amount: number;
  amountQuantity: number;
  toggleCart: () => void;
  addProducts: (product: CartProducts) => void;
  decreaseProductsQuantity: (productId: string) => void;
  increaseProductsQuantity: (productId: string) => void;
  removeProduct: (productId: string) => void;
  cleanCart: () => void;
}

export const CartContext = createContext<IcartContext>({
  isOpen: false,
  products: [],
  amount: 0,
  amountQuantity: 0,
  toggleCart: () => {},
  addProducts: () => {},
  decreaseProductsQuantity: () => {},
  increaseProductsQuantity: () => {},
  removeProduct: () => {},
  cleanCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProducts[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleCart = () => {
    setIsOpen((prev) => !prev);
  };

  const addProducts = (product: CartProducts) => {
    //verificar se o produto ja esta no carrinho
    const productIsAlreadyOnTheCart = products.some(
      (prevProducts) => prevProducts.id === product.id,
    );
    if (!productIsAlreadyOnTheCart) {
      return setProducts((prev) => [...prev, product]);
    }
    setProducts((prevProducts) => {
      return prevProducts.map((prevProducts) => {
        if (prevProducts.id === product.id) {
          return {
            ...prevProducts,
            quantity: prevProducts.quantity + product.quantity,
          };
        }
        return prevProducts;
      });
    });
  };

  const removeProduct = (productId: string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId),
    );
  };

  const cleanCart = () => {
    setProducts([]);
  };

  const decreaseProductsQuantity = (productId: string) => {
    setProducts((prevProducts) => {
      return prevProducts.map((prevProducts) => {
        if (prevProducts.id !== productId) {
          return prevProducts;
        }
        if (prevProducts.quantity === 1) return prevProducts;

        return { ...prevProducts, quantity: prevProducts.quantity - 1 };
      });
    });
  };

  const increaseProductsQuantity = (productId: string) => {
    setProducts((prevProducts) => {
      return prevProducts.map((prevProducts) => {
        if (prevProducts.id !== productId) {
          return prevProducts;
        }

        return { ...prevProducts, quantity: prevProducts.quantity + 1 };
      });
    });
  };

  const amount = products.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  const amountQuantity = products.reduce((acc, product) => {
    return acc + product.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        isOpen,
        products,
        toggleCart,
        addProducts,
        decreaseProductsQuantity,
        increaseProductsQuantity,
        removeProduct,
        amount,
        amountQuantity,
        cleanCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
