import BarbershopItem from "../_components/barbershop-item";
import Header from "../_components/ui/header";
import { db } from "../_lib/prisma";
import Search from "../_components/search";

interface BarbershopsPageProps {
    searchParams: {
        search: string
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
        <div >
            <Header/>
            <div className="my-6 px-5">
                <Search />
            </div>
            <div className=" px-5 mb-3 mt-6 font-bold uppercase text-xs text-gray-400 ">
                <h2 className="mb-2">Resultados para sua Busca:{searchParams.search}</h2>
                <div className=" grid grid-cols-2 gap-3">
                    {barbershops.map((barbershop) => (
                        <BarbershopItem key={barbershop.id} barbershop={barbershop}/>
                    ))}
                </div>
                
            </div>
        </div>
    );
}

export default BarbershopsPage;