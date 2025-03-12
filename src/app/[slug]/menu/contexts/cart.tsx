"use client"

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

interface CartProducts extends Pick<Product, "name" | "price" | "id" | "imageUrl"> {
    quantity: number;
}

export interface IcartContext {
    isOpen: boolean;
    products: CartProducts [];
    toggleCart: () => void;
    addProducts: (product: CartProducts) => void;
}

export const CartContext = createContext<IcartContext>({
    isOpen: false,
    products: [],
    toggleCart: () => {},
    addProducts: () => {},
})

export const CartProvider = ({children}: {children: ReactNode}) => {
    const [products, setProducts] = useState<CartProducts[]>([])
    const [isOpen, setIsOpen] = useState<boolean>(false)
    
    const toggleCart = () => {
        setIsOpen(prev => !prev)
    }

    const addProducts = (product: CartProducts) => {
        setProducts(prev => ([...prev, product]))
    }

    return (
        <CartContext.Provider 
        value={{
            isOpen,
            products,
            toggleCart,
            addProducts,
        }}>
            {children}
        </CartContext.Provider>
    )
};