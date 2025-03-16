"use server";

import Image from "next/image";
import { notFound } from "next/navigation";

import ThemeButton from "@/components/theme-button";
import { db } from "@/lib/prisma";

import ConsumptionMethodOption from "./[slug]/components/consumption-method-option";

const RestaurantPage = async () => {
  const slug = "pao-e-chapa";

  const restaurant = await db.restaurant.findUnique({
    where: {
      slug: slug,
    },
  });

  if (!restaurant) {
    return notFound();
  }

  return (
    <>
      <div className="flex w-full justify-end pr-5 pt-5">
        <ThemeButton />
      </div>
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Image
            src="/logo.svg"
            alt={restaurant.name}
            width={150}
            height={150}
          />
        </div>
        <div className="spece-y-2 pl-6 pr-6 pt-8 text-center">
          <h3 className="text-2xl font-semibold">Seja bem-vindo!</h3>
          <p className="opacity-55">
            Escolha como prefere aproveitar sua refeição. Estamos aqui para
            oferecer praticidade e sabor em cada detalhe.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-5 pl-5 pr-5 pt-14">
          <ConsumptionMethodOption
            imageAlt="Comer Aqui"
            buttonText="Comer aqui!"
            imageSrc="/dine-in.svg"
            option="DINE_IN"
            slug={slug}
          />
          <ConsumptionMethodOption
            imageAlt="Retirar"
            buttonText="Retirar"
            imageSrc="/take-away.svg"
            option="TAKEAWAY"
            slug={slug}
          />
        </div>
      </div>
    </>
  );
};

export default RestaurantPage;
