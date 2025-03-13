import { useContext } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { CartContext } from "../contexts/cart";
import CartProductItem from "./cart-product-item";

const CartSheet = () => {

    const {isOpen, toggleCart, products} = useContext(CartContext)

    const cartIsEmpty = () => {
        return products.length <= 0;
    }
   
    return (
        <Sheet open={isOpen} onOpenChange={toggleCart}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Carrinho</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col h-full py-5">
                    <div className="flex-auto">
                        {products.map(product => (
                            <CartProductItem key={product.id} product={product}/>
                        ))}
                    </div>
                    <Button className="w-full h-8 rounded-full" disabled={cartIsEmpty()}>
                        Finalizar pedido
                    </Button>
                </div>
            </SheetContent>

        </Sheet>
    );
}
 
export default CartSheet;