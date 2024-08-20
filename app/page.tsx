import { Button } from "./_components/ui/button"
import Header from "./_components/ui/header"
import Image from "next/image";
import Search from "./_components/search";
import { db } from "./_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import quickSearchOptions from "./_constants/search";
import BookingItem from "./_components/booking-item";
import BarbershopsPage from "./barbershops/page";



const Home = async () => {
    const barbershops = await db.barbershop.findMany({})
    const popularBarbershops = await db.barbershop.findMany({
        orderBy: {
            name: "desc"
        }
    })
    
    return (
        <div>
            <Header />
                {/* TEXTO */}
            <div className="p-5">
                <h2 className="text-4xl font-bold">Olá,Mario Luis!</h2>
                <p className=" mb-4">Segunda-Feira 5 Agosto.</p>
                
                {/* BUSCA */}
                <Search/>
                {/* BUSCA RAPIDA */}
                <div className=" flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
                {quickSearchOptions.map((option) => (
                    <Button variant="secondary" className=" flex gap-1 mt-5" key={option.title} >
                    <Image src={option.imageUrl} width={16} height={16} alt={option.title}/>
                    {option.title}
                    </Button>
                ))}
                </div>

                {/* BANNER */}
                <div className="relative h-[150px] w-full mt-6">
                    <Image alt="baner,agende nos melhores com fsw-barber" src="/banner-01.png" fill className="object-cover rounded-xl" />
                </div>
                
                {/* AGENDAMENTOS */}
                <BookingItem />

                <p className=" mt-6 mb-3 font-bold uppercase text-xs text-gray-400 ">recomendados</p>
                {/* SCROLL DE RECOMENDADOS */}
                <div className=" flex gap-2 overflow-scroll [&::-webkit-scrollbar]:hidden ">
                {barbershops.map((barbershop) => (<BarbershopItem key={barbershop.id} barbershop={barbershop} />))}
                </div>

                <p className=" mt-6 mb-3 font-bold uppercase text-xs text-gray-400 ">populares</p>
                {/* SCROLL DE POPULARES */}
                <div className=" flex gap-2 overflow-scroll [&::-webkit-scrollbar]:hidden ">
                {popularBarbershops.map((barbershop) => (<BarbershopItem key={barbershop.id} barbershop={barbershop} />))}
                </div>
            </div>
        </div>
    )
}


export default Home