import { Badge } from "./ui/badge";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Card, CardContent } from "./ui/card";
import { Prisma } from "@prisma/client"
import { isFuture,format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { SheetTrigger,Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from "./ui/sheet";
import Image from "next/image";
import { Button } from "./ui/button";
import PhoneItem from "./phone-item";
import { ReactNode } from "react";
import Link from "next/link";
import { DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Dialog, DialogClose, DialogFooter, DialogHeader } from "./ui/dialog";


interface BookingItemProps {
    booking: Prisma.BookingGetPayload<{
        include: {
            service: {
                include: {
                    barbershop: true
                }
            }
        }
    }>
}


const BookingItem = ({booking}: BookingItemProps) => {
    const {service: {barbershop}} = booking
    const isConfirmed = isFuture(booking.date)
    function phone(value: string, index: number, array: string[]): ReactNode {
        throw new Error("Function not implemented.");
    }

    return (
        <Sheet>
            <SheetTrigger className=" w-full">
                <Card className=" rounded-xl" >
                    <CardContent className="flex justify-between p-0 ">
                        {/* DIV DA ESQUERDA */}
                        <div className="flex flex-col pl-5 py-5 gap-2 ">
                            <Badge variant={isConfirmed ? "default" : "secondary"} className="w-fit uppercase ">
                                {isConfirmed? "Confirmado" : "Finalizado"}
                            </Badge>
                            <h3 className="font-semibold ">{booking.service.name}</h3>

                            <div className="flex items-center gap-2 ">
                                <Avatar className="h-9 w-9 ">
                                    <AvatarImage src={booking.service.barbershop.imageUrl} />
                                </Avatar>
                                <p className="text-sm">{booking.service.barbershop.name}</p>
                            </div>
                        </div>
                        {/* DIV DA DIREITA */}
                        <div className="flex flex-col items-center justify-center px-5 border-l-2 border-solid ">
                            <p className=" text-sm pb-3 capitalize">{format(booking.date, "MMMM", { locale:ptBR })}</p>
                            <p className=" text-4xl ">{format(booking.date, "dd", { locale:ptBR })}</p>
                            <p className="text-sm pt-3">{format(booking.date, "HH:mm", { locale:ptBR })}</p>
                        </div>
                    </CardContent>
                </Card>
            </SheetTrigger>
            <SheetContent className=" overflow-y-auto [&::-webkit-scrollbar]:hidden w-[90%]">
                <SheetHeader>
                    <SheetTitle className="  text-left">Informações da reserva</SheetTitle>
                </SheetHeader>
                <div className="mt-5 flex items-end relative h-[150px] w-full ">
                    <Image alt="mapa.imagem" src="/road.jpg.webp" fill className=" rounded-xl object-cover" />
                    <Card className=" rounded-xl opacity-80 z-50 w-full mb-3 mx-5">
                        <CardContent className="flex items-center gap-2 px-2 py-2">
                            <Avatar>
                                <AvatarImage src={barbershop.imageUrl}/>
                            </Avatar>
                            <div>
                                <h3 className="font-bold">{barbershop.name}</h3>
                                <p className=" text-xs">{barbershop.address}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="mt-5">
                    <Badge variant={isConfirmed ? "default" : "secondary"} className="w-fit uppercase ">
                        {isConfirmed? "Confirmado" : "Finalizado"}
                    </Badge>
                    <Card className="mt-3 mb-5 rounded-xl">
                        <CardContent className="p-3 space-y-3">
                            <div className=" flex justify-between items-center">
                                <h2 className=" font-bold">{booking.service.name}</h2>
                                <p className=" text-sm font-bold">
                                    {Intl.NumberFormat("pt-BR",{ style: "currency",currency: "BRL",}).format(Number(booking.service.price))}
                                </p>
                            </div>
                            <div className=" flex justify-between items-center">
                                <h2 className=" text-sm">Data</h2>
                                <p className=" text-sm">
                                    {format(booking.date,"d 'de' MMM",{locale: ptBR})}
                                </p>
                            </div>
                            <div className=" flex justify-between items-center">
                                <h2 className=" text-sm">Horário</h2>
                                <p className=" text-sm">
                                    {format(booking.date, "HH:mm", { locale:ptBR, })}
                                </p>
                            </div>
                            <div className=" flex justify-between items-center">
                                <h2 className=" text-sm">Barbearia</h2>
                                <p className=" text-sm">
                                    {barbershop.name}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                    <div className=" space-y-3">
                    {barbershop.phones.map((phone, index) => (<PhoneItem key={index} phone={phone}/>))}
                    </div>
                </div>
                <SheetFooter className="mt-6">
                    <div className=" flex items-center gap-3">
                        <SheetClose asChild >
                            <Button className=" w-full" variant="outline">Voltar</Button>
                        </SheetClose>
                        {isConfirmed && (
                            <Dialog >
                                <DialogTrigger asChild>
                                    <Button className=" w-full font-bold"  variant="destructive">Cancelar</Button>
                                </DialogTrigger>
                                <DialogContent className=" w-[90%]">
                                    <DialogHeader>
                                        <DialogTitle className=" text-xl">Deseja realmente cancelar?</DialogTitle>
                                        <DialogDescription>
                                            Ao cancelar você apagará sua reserva,esta ação é irreversivel.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter className=" gap-2 flex flex-row">
                                        <DialogClose asChild>
                                            <Button className=" w-full" variant="secondary" >Voltar</Button>
                                        </DialogClose>
                                        <Button className=" w-full" variant="destructive">Cancelar</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        )}
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default BookingItem