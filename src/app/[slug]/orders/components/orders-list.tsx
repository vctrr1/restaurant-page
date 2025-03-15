"use client";

import { OrderStatus, Prisma } from "@prisma/client";
import { format } from "date-fns";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface OrdersListPros {
  orders: Prisma.OrderGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
          avatarImageUrl: true;
        };
      };
      orderProducts: {
        include: {
          product: true;
        };
      };
    };
  }>[];
}

const OrdersList = ({ orders }: OrdersListPros) => {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const handleBackClick = () => router.push(`/${slug}`);

  const getOrderStatus = (status: OrderStatus) => {
    if (status === "FINISHED") {
      return "Finalizado";
    } else if (status === "IN_PREPARATION") {
      return "Em preparo";
    } else if (status === "PENDING") {
      return "Pendente";
    } else {
      return "";
    }
  };

  const statusColors = {
    [OrderStatus.FINISHED]: "bg-green-400 text-white",
    [OrderStatus.PENDING]: "bg-gray-400 text-white",
    [OrderStatus.IN_PREPARATION]: "bg-yellow-500 text-white",
  };

  return (
    <div className="space-y-8 p-6">
      <Button
        className="rounded-full"
        variant="secondary"
        size="icon"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>
      <div className="flex items-center gap-3">
        <ScrollTextIcon />
        <h2>Meus pedidos</h2>
      </div>
      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent className="space-y-4 p-5">
            <div
              className={`w-fit rounded-full px-2 text-xs ${statusColors[order.status]}`}
            >
              <p>{getOrderStatus(order.status)}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative h-5 w-5">
                <Image
                  src={order.restaurant.avatarImageUrl}
                  alt={order.restaurant.name}
                  fill
                />
              </div>
              <p className="text-sm font-semibold">{order.restaurant.name}</p>
            </div>
            <Separator />
            {order.orderProducts.map((product) => (
              <div key={product.product.id} className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground text-sm text-white">
                  {product.quantity}
                </div>
                <p className="text-sm font-light">{product.product.name}</p>
              </div>
            ))}
            <Separator />
            <div className="flex items-center justify-between text-sm font-medium">
              {new Intl.NumberFormat("pt-BR", {
                currency: "BRL",
                style: "currency",
              }).format(order.total)}
              <div className="text-xs font-light">
                {format(order.createdAt, "dd/MM/yy kk:mm")}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OrdersList;
