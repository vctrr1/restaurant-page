import { Prisma } from "@prisma/client";
import Image from "next/image";

interface ProductDetailProps {
    product: Prisma.ProductGetPayload<{
        include: {
            restaurant: {
                select: {
                    name: true,
                    avatarImageUrl: true
                }
            }
        }
    }>
}

const ProductDetail = ({product}: ProductDetailProps) => {
    return (
        <div className="relative z-50 rounded-t-3xl mt-[-1.5rem] p-5 bg-background">
            <div>
                {/** Restaurante */}
                <div className="flex items-center gap-1">
                    <Image alt={product.restaurant.name} src={product.restaurant.avatarImageUrl} width={30} height={30}/>
                    <p className="text-xs text-muted-foreground">{product.restaurant.name}</p>
                </div>
                <h2 className="text-lg font-semibold">{product.name}</h2>
            </div>

        </div>
    );
}
 
export default ProductDetail;