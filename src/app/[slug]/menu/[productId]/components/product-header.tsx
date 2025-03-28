"use client";

import { Product } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from "react";

import { Button } from "@/components/ui/button";

import { CartContext } from "../../contexts/cart";

interface ProductHeaderProps {
    product: Pick<Product, "imageUrl" | "name">;
}

const ProductHeader = ({product}: ProductHeaderProps) => {

    const {toggleCart} = useContext(CartContext);

    const router = useRouter();

    const handleBackClick = () => {
        router.back();
    }

    return (
        <div className="relative h-[250px] w-full bg-slate-200">
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-4 top-4 z-50 rounded-full"
              onClick={handleBackClick}
            >
              <ChevronLeftIcon />
            </Button>
            <Image
              alt={product.name}
              fill
              src={product.imageUrl}
              className="object-cover"
            />
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-4 top-4 z-50 rounded-full"
              onClick={toggleCart}
            >
              <ScrollTextIcon />
            </Button>
      </div>
    );
}
 
export default ProductHeader;