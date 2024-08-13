import { Badge } from "./_components/ui/badge";
import { Button } from "./_components/ui/button"
import Header from "./_components/ui/header"
import { Input } from "./_components/ui/input"
import Image from "next/image";
import { Card, CardContent } from "./_components/ui/card";
import { SearchIcon } from "lucide-react";
import { Avatar } from "./_components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

const Home = () => {
    return (
        <div>
            <Header />
                {/* TEXTO */}
            <div className="p-5">
                <h2 className="text-xl font-bold">Olá,Mario Luis!</h2>
                <p>Segunda-Feira 5 Agosto.</p>
                {/* BUSCA */}
                <div className="mt-6 flex gap-2 items-center">
                    <Input placeholder=" Buascar..." />
                    <Button>
                        <SearchIcon />
                    </Button>
                </div>
                {/* BANNER */}
                <div className="relative h-[150px] w-full mt-6">
                    <Image alt="baner,agende nos melhores com fsw-barber" src="/banner-01.png" fill className="object-cover rounded-xl" />
                </div>
                {/* AGENDAMENTO */}
                <Card className="mt-6">
                    <CardContent className="flex justify-between p-0 ">
                {/* DIV DA ESQUERDA */}
                    <div className="flex flex-col pl-5 py-5 gap-2 ">
                        <Badge className="w-fit">Confirmado</Badge>
                        <h3 className="font-semibold ">Corte de Cabelo</h3>

                        <div className="flex items-center gap-2 ">
                            <Avatar className="h-6 w-6 ">
                                <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
                            </Avatar>
                            <p className="text-sm">Barbearia FSW</p>
                        </div>
                    </div>
                {/* DIV DA ESQUERDA */}
                    <div className="flex flex-col items-center justify-center px-5 border-l-2 border-solid ">
                        <p className=" text-sm ">Agosto</p>
                        <p className=" text-3xl ">05</p>
                        <p className="text-sm ">20:00</p>
                    </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}


export default Home