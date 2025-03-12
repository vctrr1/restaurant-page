"use server"

import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import ProductDetail from "./components/product-detail";
import ProductHeader from "./components/product-header";

interface ProductPageProps {
    params: Promise<{productId: string, slug: string}>;
}

const ProductPage = async ({params}:ProductPageProps) => {

    const {slug, productId} = await params;

    const product = await db.product.findUnique({
        where: {
            id: productId
        },
        include: {
            restaurant: {
                select: {
                    name: true,
                    avatarImageUrl: true,
                    slug: true,
                }
            }
        }
    });

    if(!product) {
        return notFound();
    }

    if(product.restaurant.slug.toUpperCase() !== slug.toUpperCase()){
        return notFound();
    }

    return (
        <div className="flex h-full flex-col">
            <ProductHeader product={product}/>
            <ProductDetail product={product}/>
        </div>
    );
}
 
export default ProductPage;