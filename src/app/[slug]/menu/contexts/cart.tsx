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
        //verificar se o produto ja esta no carrinho

        const productIsAlreadyOnTheCart = products.some(prevProducts => prevProducts.id === product.id)
        if(!productIsAlreadyOnTheCart) {
            return setProducts((prev) => [...prev, product])
        }
        setProducts(prevProducts => {
            return prevProducts.map(prevProducts => {
                if(prevProducts.id === product.id){
                    return {
                        ...prevProducts,
                        quantity: prevProducts.quantity + product.quantity,
                    }
                }
                return prevProducts
            })
        })
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