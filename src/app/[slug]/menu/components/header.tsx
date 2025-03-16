"use client";

import { Restaurant } from "@prisma/client";
import { Pick } from "@prisma/client/runtime/library";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import CartSheet from "./cart-sheet";

interface RestaurantHeaderProps {
  restaurant: Pick<Restaurant, "coverImageUrl" | "name">;
  slug: string;
}



const RestaurantHeader = ({ restaurant, slug }: RestaurantHeaderProps) => {

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
          onClick={() => router.push(`/${slug}/orders`)}
        >
          <ScrollTextIcon />
        </Button>
      </div>
      <CartSheet/>
    </>

  );
};

export default RestaurantHeader;
