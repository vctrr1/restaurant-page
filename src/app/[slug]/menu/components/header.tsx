"use client";

import { Restaurant } from "@prisma/client";
import { Pick } from "@prisma/client/runtime/library";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from "react";

import { Button } from "@/components/ui/button";

import { CartContext } from "../contexts/cart";
import CartSheet from "./cart-sheet";

interface RestaurantHeaderProps {
  restaurant: Pick<Restaurant, "coverImageUrl" | "name">;
}

const RestaurantHeader = ({ restaurant }: RestaurantHeaderProps) => {

  const {toggleCart} = useContext(CartContext);

  const handleAddToCart = () => {
    toggleCart();
  }

  const router = useRouter();

  return (
    <>
      <div className="relative h-[250px] w-full">
        <Button
          variant="secondary"
          size="icon"
          className="absolute left-4 top-4 z-50 rounded-full"
          onClick={() => router.back()}
        >
          <ChevronLeftIcon />
        </Button>
        <Image
          alt={restaurant.name}
          fill
          src={restaurant.coverImageUrl}
          className="object-cover"
        />
        <Button
          variant="secondary"
          size="icon"
          className="absolute right-4 top-4 z-50 rounded-full"
          onClick={handleAddToCart}
        >
          <ScrollTextIcon />
        </Button>
      </div>
      <CartSheet/>
    </>

  );
};

export default RestaurantHeader;
