"use server"

import { db } from "@/lib/prisma";

import { isValidCpf, removeCpfPontuation } from "../menu/helpers/cpf";
import CpfForm from "./components/cpf-form";
import OrdersList from "./components/orders-list";

interface OrdersProps {
    searchParams: Promise<{ cpf: string }>;
}

const Orders = async ({searchParams}: OrdersProps) => {
    const { cpf } = await searchParams;
    //se  não  existir cpf na url ou se o cpf da url n tiver o formato valido retorna o form de CPF
    if(!cpf){
        return <CpfForm/>
    }else if(!isValidCpf(cpf)){
        return <CpfForm/>
    }
    
    const orders = await db.order.findMany({
        orderBy: {
            createdAt: "desc"
        },
        where: {
            customerCpf: removeCpfPontuation(cpf)
        },
        include: {
            restaurant: {
                select: {
                    name: true,
                    avatarImageUrl: true,
                }
            },
            orderProducts: {
                include: {
                    product: true
                },
            }
        }
    })

    return (
        <OrdersList orders={orders}/>
    );
}
 
export default Orders;