"use server"

import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import ProductDetail from "./components/product-detail";
import ProductHeader from "./components/product-header";

interface ProductPageProps {
    params: Promise<{productId: string}>;
}

const ProductPage = async ({params}:ProductPageProps) => {

    const {productId} = await params;

    const product = await db.product.findUnique({
        where: {
            id: productId
        },
        include: {
            restaurant: {
                select: {
                    name: true,
                    avatarImageUrl: true
                }
            }
        }
    });

    if(!product) {
        return notFound();
    }

    return (
        <div>
            <ProductHeader product={product}/>
            <ProductDetail product={product}/>
        </div>
    );
}
 
export default ProductPage;