import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";

import { Button } from "@/components/ui/button";

import { CartContext, CartProducts } from "../contexts/cart";

interface CartProductItemProps {
    product: CartProducts;
}

const CartProductItem = ({product}: CartProductItemProps) => {

    const {decreaseProductsQuantity, increaseProductsQuantity, removeProduct} = useContext(CartContext)

    return (
        <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-3">
                <div className="relative min-h-20 min-w-20">
                    <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
                </div>
                <div className="space-y-1">
                    <p className="text-xs">{product.name}</p>
                    <p className="text-sm font-semibold">
                        {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                        }).format(product.price)}
                    </p>
                    <div className="flex items-center gap-1 text-center">
                        <Button className="w-7 h-7 rounded-lg" onClick={() => decreaseProductsQuantity(product.id)}>
                            <ChevronLeft/>
                        </Button>
                        <p className="w-6">{product.quantity}</p>
                        <Button className="w-7 h-7 rounded-lg" onClick={() => increaseProductsQuantity(product.id)}>
                            <ChevronRight/>
                        </Button>
                    </div>
                </div>
            </div>
            <Button variant="outline" className="w-7 h-7 rounded-lg text-red-500" onClick={() => removeProduct(product.id)}>
                <Trash2 />
            </Button>
        </div>
    );
}
 
export default CartProductItem;