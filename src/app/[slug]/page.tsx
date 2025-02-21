import Image from "next/image";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/lib/prisma";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { slug } = await params;

  const restaurant = await db.restaurant.findUnique({
    where: {
      slug: slug,
    },
  });

  if (!restaurant) {
    return notFound();
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <Image src="/logo.svg" alt={restaurant.name} width={150} height={150} />
      </div>
      <div className="spece-y-2 pl-6 pr-6 pt-24 text-center">
        <h3 className="text-2xl font-semibold">Seja bem-vindo!</h3>
        <p className="opacity-55">
          Escolha como prefere aproveitar sua refeição. Estamos aqui para
          oferecer praticidade e sabor em cada detalhe.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-5 pt-14">
        <Card>
          <CardContent className="flex flex-col items-center gap-8 py-8">
            <div className="relative h-[70px] w-[70px]">
              <Image
                src="/dine-in.svg"
                alt="Comer aqui"
                width={70}
                height={70}
              />
            </div>
            <Button variant="secondary">Comer aqui</Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center gap-8 py-8">
            <div className="relative h-[70px] w-[70px]">
              <Image
                src="/take-away.svg"
                alt="Retirar"
                width={70}
                height={70}
              />
            </div>
            <Button variant="secondary">Retirar</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RestaurantPage;
