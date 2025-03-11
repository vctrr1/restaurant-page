"use server"

import { ConsumptionMethod } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ConsumptionMethodOptionProps {
  buttonText: string;
  imageSrc: string;
  imageAlt: string;
  option: ConsumptionMethod;
  slug: string;
}
const ConsumptionMethodOption = ({
  buttonText,
  imageAlt,
  imageSrc,
  option,
  slug,
}: ConsumptionMethodOptionProps) => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-8 py-8">
        <div className="relative h-[70px] w-[70px]">
          <Image src={imageSrc} alt={imageAlt} width={70} height={70} />
        </div>
        <Button variant="secondary" asChild>
          <Link href={`/${slug}/menu?consumptionMethod=${option}`}>
            {buttonText}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ConsumptionMethodOption;
