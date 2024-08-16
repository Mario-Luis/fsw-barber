import { BarbershopService } from "@prisma/client";
import { CardContent , Card } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";


interface ServiceItemProps {
    service: BarbershopService
}

const ServiceItem = ({service}: ServiceItemProps) => {
    return (
        <Card className=" max-w-[420px] rounded-xl">
            <CardContent className=" flex items-center gap-3 p-3 ">
                    {/* IMAGE */}
                    <div className=" relative min-h-[110px] min-w-[110px] max-w-[110px] max-h-[110px]">
                        <Image alt="service.name" src={service.imageUrl} fill className=" rounded-xl object-cover"/>
                    </div>
                    {/* DIREITA */}
                    <div className=" space-y-2">
                        <h3 className=" font-semibold">{service.name}</h3>
                        <p className=" text-sm text-gray-400">{service.description}</p>

                        <div className="flex item-center justify-between">
                        <p className=" text-sm font-bold text-primary">
                            {Intl.NumberFormat("pt-BR",{ style: "currency",currency: "BRL",}).format(Number(service.price))}
                        </p>
                        <Button variant="secondary" size="sm" className=" uppercase text-primary rounded-xl">reservar</Button>
                        </div>
                    </div>
            </CardContent>
        </Card>
    )
}


export default ServiceItem;