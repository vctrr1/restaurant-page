"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ConsumptionMethod } from "@prisma/client";
import { Loader2Icon } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useContext, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { createOrder } from "../actions/order-action";
import { CartContext } from "../contexts/cart";
import { isValidCpf } from "../helpers/cpf";

interface FinishOrderButtonProps {
  cartIsEmpty: boolean;
}

const formShema = z.object({
  name: z.string().trim().min(1, {
    message: "O nome é obrigatorio!",
  }),
  cpf: z
    .string()
    .trim()
    .min(1, { message: "CPF é obrigatorio." })
    .refine((value) => isValidCpf(value), {
      message: "CPF invalido.",
    }),
});

type FormShema = z.infer<typeof formShema>;

const FinishOrderButton = ({ cartIsEmpty }: FinishOrderButtonProps) => {
  const { slug } = useParams<{ slug: string }>();
  const { products, cleanCart, toggleCart } = useContext(CartContext);
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<FormShema>({
    resolver: zodResolver(formShema),
    defaultValues: {
      name: "",
      cpf: "",
    },
    shouldUnregister: true, // apaga os valores digitados se cancelar
  });

  const onSubmit = async (data: FormShema) => {
    try {
      const cm = searchParams.get("consumptionMethod") as ConsumptionMethod;
      setIsLoading(async () => {
        await createOrder({
          consumptionMethod: cm,
          customerCpf: data.cpf,
          customerName: data.name,
          products: products,
          slug: slug,
        });
        cleanCart();
        toggleCart();
        form.reset();
        setIsOpen(false);
        toast.success("Pedido realizado com sucesso!");
      });
    } catch (e) {
      toast.error("Algo deu errado!");
      console.log(e);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button disabled={cartIsEmpty}>Finalizar</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Finalizar Pedido</DrawerTitle>
          <DrawerDescription>
            Insira suas informações abaixo para finalizar o seu pedido.
          </DrawerDescription>
        </DrawerHeader>
        <div className="pl-5 pr-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome:</FormLabel>
                    <FormControl>
                      <Input
                        className="text-sm"
                        placeholder="Digite seu nome..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF:</FormLabel>
                    <FormControl>
                      <PatternFormat
                        className="text-sm"
                        placeholder="Digite seu CPF..."
                        format="###.###.###-##"
                        customInput={Input}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DrawerFooter>
                <Button
                  type="submit"
                  variant="destructive"
                  className="rounded-full"
                  disabled={isLoading}
                >
                  {isLoading && <Loader2Icon className="animate-spin" />}
                  Finalizar
                </Button>
                <DrawerClose asChild>
                  <Button className="w-full rounded-full" variant="outline">
                    Cancelar
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default FinishOrderButton;
