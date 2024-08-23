import { Button } from "./_components/ui/button"
import Header from "./_components/ui/header"
import Image from "next/image";
import Search from "./_components/search";
import { db } from "./_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import quickSearchOptions from "./_constants/search";
import BookingItem from "./_components/booking-item";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "./_lib/auth";
import { useSession } from "next-auth/react";



const Home = async () => {
    const session = await getServerSession(authOptions)
    const barbershops = await db.barbershop.findMany({})
    const popularBarbershops = await db.barbershop.findMany({
        orderBy: {
            name: "desc"
        }
    })
    

    const bookings = session?.user? await db.booking.findMany({
        orderBy: {
            date: "asc",
        },
        where: {
            userId: (session.user as any).id,
            date: {
                gte: new Date(),
            }
        },
        include: {
            service: {
                include: {
                    barbershop: true
                }
            }
        },
        
    })
    : []

    
    return (
        <div>
            <Header />
                {/* TEXTO */}
            <div className="p-5" >
                <h2 className=" text-4xl font-bold">Olá,Mario Luis</h2>
                <p className=" mb-4">Segunda-Feira 5 Agosto.</p>
                
                {/* BUSCA */}
                <div className=" p-0"><Search/></div>
                {/* BUSCA RAPIDA */}
                <div className=" flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
                {quickSearchOptions.map((option) => (
                    <Button asChild variant="secondary" className=" flex gap-1 mt-5" key={option.title} >
                        <Link href={`/barbershops?service=${option.title}`}>
                            <Image src={option.imageUrl} width={16} height={16} alt={option.title}/>
                            {option.title}
                        </Link>
                    </Button>
                ))}
                </div>

                {/* BANNER */}
                <div className="relative h-[150px] w-full mt-6">
                    <Image alt="baner,agende nos melhores com fsw-barber" src="/banner-01.png" fill className="object-cover rounded-xl" />
                </div>
                
                {/* AGENDAMENTOS */}
                <p className="mt-6 mb-3 font-bold uppercase text-xs text-gray-400 ">agendamentos</p>
                <div className=" gap-3 flex overflow-x-auto [&::-webkit-scrollbar]:hidden">
                    {bookings.map((booking) => (
                        <BookingItem key={booking.id} booking={booking}/>
                    ))}
                </div>

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