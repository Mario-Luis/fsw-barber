import PhoneItem from "@/app/_components/phone-item";
import ServiceItem from "@/app/_components/service-item";
import SidebarSheet from "@/app/_components/sidebar-sheet";
import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon, Icon, MapIcon, MapPinIcon, MenuIcon, Phone, SmartphoneIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";


interface BarbershopItemProps {
    params: {
        id: string
    }
}

const barbershopPage = async ({params}: BarbershopItemProps ) => {
    
    const barbershop = await db.barbershop.findUnique({
        where: {
            id: params.id,
        },
        include: {
            services: true,
        },
    })

    if (!barbershop) {
        return notFound()
    }

    return (
        <div>
            {/* IMAGEM */}
            <div className=" relative w-full h-[250px]">
                <Image alt="Imagem da Barbearia" src={barbershop?.imageUrl} fill className=" object-cover"/>
                <Button asChild size="icon" variant="secondary" className=" absolute left-4 top-4">
                    <Link href="/">
                        <ChevronLeftIcon className=" text-primary"/>
                    </Link>
                </Button>
                <SidebarSheet/>
            </div>
            
            <div className=" border-b border-solid p-5">
                    <h1 className=" text-xl font-bold">{barbershop?.name}</h1>
                    <div className=" mt-1 flex mb-0 items-center gap-1">
                        <MapPinIcon className=" text-primary" size={18}/>
                        <p className=" text-sm">{barbershop?.address}</p>
                    </div>

                    <div className=" flex mb-2 items-center gap-1">
                        <StarIcon className="fill-primary text-primary" size={18}/>
                        <p className=" text-sm">9.2M</p>
                    </div>
            </div>
            {/* DESCRIÇÃO */}
            <div className=" space-y-2 border-b border-solid p-5 ">
                <h2 className=" text-xs uppercase font-bold text-gray-400 ">sobre nós</h2>
                <p className=" text-justify text-sm">{barbershop?.description}</p>
            </div>
            {/* SERVIÇOS */}
            <div className=" space-y-2 border-b border-solid p-5">
                <h2 className=" text-xs uppercase font-bold text-gray-400 ">serviços</h2>
                <div className=" space-y-3">
                    {barbershop.services.map((service) => (<ServiceItem key={service.id} barbershop={barbershop} service={service}/>))}
                </div>
                
            </div>
            <div className=" space-y-3 p-5">
                {barbershop.phones.map(phone => (
                    <PhoneItem key={phone} phone={phone}/>
                ))}
            </div>
        </div>
    )
}

export default barbershopPage;