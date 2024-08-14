import { Button } from "./_components/ui/button"
import Header from "./_components/ui/header"
import { Input } from "./_components/ui/input"
import Image from "next/image";
import { Card, CardContent } from "./_components/ui/card";
import { SearchIcon } from "lucide-react";
import { db } from "./_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import quickSearchOptions from "./_constants/search";
import BookingItem from "./_components/booking-item";



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
                <p>Segunda-Feira 5 Agosto.</p>
                
                {/* BUSCA */}
                <div className="mt-6 flex gap-2 items-center">
                    <Input placeholder=" Buscar....." />
                    <Button>
                        <SearchIcon />
                    </Button>
                </div>

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
            <footer>
            <Card className=" mt-5" >
                <CardContent className=" px-7 py-7">
                    <p className=" text-xs text-gray-400">
                    © 2024 Copyright <span className=" font-bold text-xm">https://github.com/Mario-Luis</span>
                    </p>
                </CardContent>
            </Card>
            </footer>
        </div>
    )
}


export default Home