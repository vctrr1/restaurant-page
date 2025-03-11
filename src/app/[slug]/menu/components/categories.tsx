"use client"

import { MenuCategory, Prisma } from "@prisma/client";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface RestaurantCategoriesProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      menuCategories: {
        include: { products: true };
      };
    };
  }>;
}

const RestaurantCategories = ({ restaurant }: RestaurantCategoriesProps) => {

    const [selectedCategory, setSelectedCategory]= useState<MenuCategory>(restaurant.menuCategories[0]);

    const handleCategoryClick = (category: MenuCategory) => {
        setSelectedCategory(category);
    }

  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl bg-white">
      <div className="border-b p-4">
        <div className="flex items-center gap-3">
          <Image
            alt={restaurant.name}
            src={restaurant.avatarImageUrl}
            width={55}
            height={55}
          />
          <div>
            <h2 className="text-lg font-semibold">{restaurant.name}</h2>
            <p className="text-xs font-light">{restaurant.description}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1 text-xs text-green-500">
          <ClockIcon size={12} />
          <p>Aberto!</p>
        </div>
      </div>
      <ScrollArea className="w-full">
        <div className="flex w-max space-x-4 p-4 pt-3">
          {restaurant.menuCategories.map((item) => (
            <Button
              key={item.id}
              variant={selectedCategory.id === item.id ? "default" : "secondary"}
              size="sm"
              className="rounded-2xl font-normal"
              onClick={() => handleCategoryClick(item)}
            >
              {item.name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default RestaurantCategories;

