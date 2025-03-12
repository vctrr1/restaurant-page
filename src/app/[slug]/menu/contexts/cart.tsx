"use client"

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

interface CartProducts extends Product {
    quantity: number;
}

export interface IcartContext {
    isOpen: boolean;
    products: CartProducts [];
    toggleCart: () => void;
}

export const CartContext = createContext<IcartContext>({
    isOpen: false,
    products: [],
    toggleCart: () => {}
})

export const CartProvider = ({children}: {children: ReactNode}) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [products, setProducts] = useState<CartProducts[]>([])
    const [isOpen, setIsOpen] = useState<boolean>(false)
    
    const toggleCart = () => {
        setIsOpen(prev => !prev)
    }

    return (
        <CartContext.Provider 
        value={{
            isOpen,
            products,
            toggleCart,
        }}>
            {children}
        </CartContext.Provider>
    )
};