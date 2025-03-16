import { useContext } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { CartContext } from "../contexts/cart";
import CartProductItem from "./cart-product-item";
import FinishOrderButton from "./finish-order-button";
  

const CartSheet = () => {

    const {isOpen, toggleCart, products, amount} = useContext(CartContext)

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
                    <Card className="mb-5">
                        <CardContent className="p-5">
                            <div className="flex justify-between ">
                                <p className="text-sm text-muted-foreground">Total</p>
                                <p className="font-semibold text-sm">{new Intl.NumberFormat("pt-BR", {
                                    style: "currency",
                                    currency: "BRL"
                                }).format(amount)}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <FinishOrderButton cartIsEmpty={cartIsEmpty()}/>
                </div>
            </SheetContent>

        </Sheet>
    );
}
 
export default CartSheet;