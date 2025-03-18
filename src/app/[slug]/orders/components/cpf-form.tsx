"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { isValidCpf, removeCpfPontuation } from "../../menu/helpers/cpf";

const formSchema = z.object({
  cpf: z
    .string()
    .trim()
    .min(1, { message: "CPF é obrigatorio." })
    .refine((value) => isValidCpf(value), { message: "CPF invalido." }),
});

type FormShema = z.infer<typeof formSchema>;

const CpfForm = () => {
  const router = useRouter();

  const form = useForm<FormShema>({
    resolver: zodResolver(formSchema),
  });

  const pathName = usePathname();

  const onSubmit = (data: FormShema) => {
    router.replace(`${pathName}?cpf=${removeCpfPontuation(data.cpf)}`);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
      <Dialog open>
        <DialogContent className="w-[90%] rounded-xl">
          <DialogHeader className="items-center">
            <DialogTitle>Histórico de compras</DialogTitle>
            <DialogDescription>
              Insira seu CPF para visualizar seus pedidos.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem className="p-4">
                    <FormLabel>CPF:</FormLabel>
                    <FormControl>
                      <PatternFormat
                        placeholder="Digite seu CPF..."
                        format="###.###.###.##"
                        customInput={Input}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="gap-3 flex flex-col w-full">
                <Button
                  type="submit"
                  variant="destructive"
                  className="rounded-full"
                >
                  Confirmar
                </Button>
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="rounded-full"
                    onClick={handleCancel}
                  >
                    Cancelar
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
  );
};

export default CpfForm;
