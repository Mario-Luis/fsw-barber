
import BarbershopItem from "../_components/barbershop-item";
import Header from "../_components/ui/header";
import { db } from "../_lib/prisma";

interface BarbershopsPageProps {
    searchParams: {
        search?: string
    }
}


const BarbershopsPage = async ({searchParams}: BarbershopsPageProps) => {
    const barbershops = await db.barbershop.findMany({
        where: {
            name: {
                contains: searchParams?.search,
                mode:"insensitive",
            },
        },
    }) 
    return (
        <div className=" mt-6 mb-3 ml-3 font-bold uppercase text-xs text-gray-400 ">
            <h2>Resultados para sua Busca:{searchParams.search}</h2>
            <div className=" grid grid-cols-2 gap-3">
                {barbershops.map((barbershop) => (
                    <BarbershopItem key={barbershop.id} barbershop={barbershop}/>
                ))}
            </div>
            
        </div>
    );
}

export default BarbershopsPage;