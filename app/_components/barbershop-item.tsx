import { Barbershop } from "@prisma/client";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { StarIcon } from "lucide-react";

interface BarbershopItemProps {
    barbershop: Barbershop
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps ) => {
    return (
        <Card className=" min-w-[159px] rounded-xl" >
            <CardContent className="p-0 px-1 pt-1">
                {/* IMAGEN */}
                <div className=" relative h-[159px] w-full">
                    <Image alt="barbershop.name" fill className=" rounded-xl object-cover" src={barbershop.imageUrl}/>
                    <Badge variant="secondary" className=" space-x-1 absolute mt-2 ml-2 ">
                        <StarIcon className=" fill-primary text-primary" size={12}/>
                        <p className=" font-sans text-xs">9.2M</p>
                    </Badge>
                </div>
                {/* TEXTO */}
                <div className=" py-3 px-0 pb-1">
                    <h3 className=" truncate font-semibold">{barbershop.name}</h3>
                    <p className=" truncate text-sm text-gray-400">{barbershop.address}</p>
                    <Button variant="secondary" className=" text-primary rounded-xl mt-3 w-full uppercase ">Reservar</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default BarbershopItem