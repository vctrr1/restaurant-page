"use client"

import { Prisma } from "@prisma/client";
import { ChefHatIcon, Dot, MinusIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";

import CartSheet from "../../components/cart-sheet";
import { CartContext } from "../../contexts/cart";

interface ProductDetailProps {
    product: Prisma.ProductGetPayload<{
        include: {
            restaurant: {
                select: {
                    name: true,
                    avatarImageUrl: true
                }
            }
        }
    }>
}

const ProductDetail = ({product}: ProductDetailProps) => {

    const {toggleCart} = useContext(CartContext)

    const [quantItens, setQuantItens] = useState<number>(0);

    const handleAddItemQuant = () => {
        setQuantItens(quantItens + 1);
    }

    const handleRemoveItemQuant = () => {
        if(quantItens <= 0) return;
        setQuantItens(quantItens - 1);
    }

    return (
        <>
            <div className="relative z-50 rounded-t-3xl mt-[-1.5rem] p-5 bg-background flex-auto flex flex-col">
                <div className="flex-auto">
                    {/** Restaurante */}
                    <div className="flex items-center gap-1">
                        <Image alt={product.restaurant.name} src={product.restaurant.avatarImageUrl} width={30} height={30}/>
                        <p className="text-xs text-muted-foreground">{product.restaurant.name}</p>
                    </div>
                    <h2 className="text-lg font-semibold">{product.name}</h2>
                    {/**Parte do valor e adicionar item e remover */}
                    <div className="flex items-center justify-between pt-2">
                        <h3>
                            {new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL"
                            }).format(product.price)}
                        </h3>
                        <div className="flex items-center gap-3 text-center">
                            <Button onClick={handleRemoveItemQuant} className="h-8 w-8 rounded-xl">
                                <MinusIcon/>
                            </Button>
                            <p className="w-4">{quantItens}</p>
                            <Button onClick={handleAddItemQuant} className="h-8 w-8 rounded-xl">
                                <PlusIcon/>
                            </Button>
                        </div>
                    </div>
                    <div className="pt-6 space-y-2">
                        <h4 className="font-semibold">Sobre</h4>
                        <p className="font-light text-sm text-muted-foreground ">{product.description}</p>
                    </div>
                    <div className="pt-6 space-y-2">
                        <div className="flex items-center gap-2">
                            <ChefHatIcon strokeWidth="1.5" width={20} />
                            <h4 className="font-semibold">Ingredientes</h4>
                        </div>
                        <div>
                            {product.ingredients.map((item, index) => (
                                <div key={index} className="flex">
                                    <Dot/>
                                    <p className="text-muted-foreground text-sm" >{item}</p>
                                </div>
                            ))}    
                        </div>
                    </div>
                </div>
                <Button onClick={toggleCart} className=" rounded-full w-full mt-6">Adicionar à sacola</Button>
            </div>
            <CartSheet/>
        </>
    );
}
 
export default ProductDetail;