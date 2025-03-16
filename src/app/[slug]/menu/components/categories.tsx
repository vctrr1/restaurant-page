"use client";

import { Prisma } from "@prisma/client";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { CartContext } from "../contexts/cart";
import CartSheet from "./cart-sheet";
import ProductsList from "./products-list";

interface RestaurantCategoriesProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      menuCategories: {
        include: { products: true };
      };
    };
  }>;
}

type MenuCategoriesWithProducts = Prisma.MenuCategoryGetPayload<{
  include: { products: true };
}>;

const RestaurantCategories = ({ restaurant }: RestaurantCategoriesProps) => {
  const { products, amount, amountQuantity, toggleCart } =
    useContext(CartContext);

  const [selectedCategory, setSelectedCategory] =
    useState<MenuCategoriesWithProducts>(restaurant.menuCategories[0]);

  const handleCategoryClick = (category: MenuCategoriesWithProducts) => {
    setSelectedCategory(category);
  };

  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl bg-background">
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
              variant={
                selectedCategory.id === item.id ? "default" : "secondary"
              }
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
      <h3 className="px-4 pt-2 font-semibold">{selectedCategory.name}</h3>
      <div className="pb-20">
        <ProductsList products={selectedCategory.products} />
      </div>
      {products.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 flex w-full items-center justify-between border-t bg-background p-5 px-5 py-3">
          <div className="">
            <p className="text-sm text-muted-foreground">Total dos items</p>
            <div className="flex gap-1">
              <p className="text-sm font-semibold">
                {new Intl.NumberFormat("pt-BR", {
                  currency: "BRL",
                  style: "currency",
                }).format(amount)}
              </p>
              <p className="text-sm text-muted-foreground">
                / {amountQuantity} {products.length > 1 ? "itens" : "item"}
              </p>
            </div>
          </div>
          <div>
            <Button
              onClick={toggleCart}
              variant="destructive"
              className="rounded-full"
            >
              Ver carrinho
            </Button>
            <CartSheet />
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantCategories;
