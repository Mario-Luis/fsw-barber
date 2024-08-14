import { Badge } from "./_components/ui/badge";
import { Button } from "./_components/ui/button"
import Header from "./_components/ui/header"
import { Input } from "./_components/ui/input"
import Image from "next/image";
import { Card, CardContent } from "./_components/ui/card";
import { SearchIcon } from "lucide-react";
import { Avatar } from "./_components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { db } from "./_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";

const Home = async () => {
    const barbershops = await db.barbershop.findMany({})
    
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
                {/* BANNER */}
                <div className="relative h-[150px] w-full mt-6">
                    <Image alt="baner,agende nos melhores com fsw-barber" src="/banner-01.png" fill className="object-cover rounded-xl" />
                </div>
                {/* AGENDAMENTOS */}
                <p className=" mt-6 mb-3 font-bold uppercase text-xs text-gray-400 ">agendamentos</p>
                <Card className=" rounded-xl" >
                    <CardContent className="flex justify-between p-0 ">
                {/* DIV DA ESQUERDA */}
                    <div className="flex flex-col pl-5 py-5 gap-2 ">
                        <Badge className="w-fit uppercase ">Confirmado</Badge>
                        <h3 className="font-semibold ">Corte de Cabelo</h3>

                        <div className="flex items-center gap-2 ">
                            <Avatar className="h-6 w-6 ">
                                <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
                            </Avatar>
                            <p className="text-sm">Barbearia FSW</p>
                        </div>
                    </div>
                {/* DIV DA DIREITA */}
                    <div className="flex flex-col items-center justify-center px-5 border-l-2 border-solid ">
                        <p className=" text-sm pb-3">Agosto</p>
                        <p className=" text-4xl ">05</p>
                        <p className="text-sm pt-3">20:00</p>
                    </div>
                    </CardContent>
                </Card>
                <p className=" mt-6 mb-3 font-bold uppercase text-xs text-gray-400 ">recomendados</p>
                {/* SCROLL DE RECOMENDADOS */}
                <div className=" flex gap-2 overflow-scroll [ &:: -webkit-scrollbar]:hidden ">
                {barbershops.map((barbershop) => (<BarbershopItem key={barbershop.id} barbershop={barbershop} />))}
                </div>
            </div>
        </div>
    )
}


export default Home