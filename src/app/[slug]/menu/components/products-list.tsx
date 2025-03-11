import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface ProductsListProps {
    products: Product[];
}

const ProductsList = ({products}: ProductsListProps) => {
    return (
        <div className="space-y-3 px-4 py-3">
            {products.map(product => (
                <Link key={product.id} href="/" className="flex items-center gap-10 py-3 border-b">
                    <div>
                        <h3 className="text-sm font-medium">{product.name}</h3>
                        <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
                        <p className="pt-3 text-sm font-semibold">
                            {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                            }).format(product.price)}
                        </p>
                    </div>
                    <div className="relative min-h-[82px] min-w-[120px]">
                        <Image alt={product.name} src={product.imageUrl} fill className="rounded-lg object-contain"/>
                    </div>
                </Link>
            ))}
        </div> 
    );
}
 
export default ProductsList;