"use client"

import { BarbershopService ,Barbershop, Booking } from "@prisma/client";
import { CardContent , Card } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from "./ui/sheet";
import { Calendar } from "./ui/calendar";
import { ptBR } from "date-fns/locale";
import { useEffect, useMemo, useState } from "react";
import { Pick } from "@prisma/client/runtime/library";
import { createBooking } from "../_actions/create-booking";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { GetBookings } from "../_actions/get-bookings";
import { Dialog, DialogContent } from "@radix-ui/react-dialog";
import SignInDialog from "./sign-in-dialog";
import { addDays,format, isPast, isToday, set } from "date-fns";


interface ServiceItemProps {
    service: BarbershopService
    barbershop: Pick<Barbershop,"name">
}

const TIME_LIST = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
]

interface GetTimeListProps {
    bookings: Booking[]
    selectedDay: Date
}


const getTimeList = ({bookings, selectedDay}: GetTimeListProps) => {
    return TIME_LIST.filter((time) => {
        const hour = Number(time.split(":")[0])
        const minutes = Number(time.split(":")[1])
        const timeIsOnThePast = isPast(set(new Date(), {hours: hour, minutes}))
        if (timeIsOnThePast && isToday(selectedDay)) {
            return false
        }


        const hasBookingOnCurrentTime = bookings.some(
            (booking) =>
                booking.date.getHours() === hour &&
            booking.date.getMinutes() === minutes,
        )
        if (hasBookingOnCurrentTime) {
            return false
        }
        return true
    })
}


const ServiceItem = ({service,barbershop}: ServiceItemProps) => {
    const [SignInDialogIsOpen,setSignInDialogIsOpen] = useState(false)
    const { data } = useSession()
    const [selectedDay,setSelectedDay] = useState<Date | undefined>(undefined)
    const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)


    const [dayBookings, setDayBookings] = useState<Booking[]>([])
    const [bookingSheetIsOpen,setbookingSheetIsOpen] = useState(false)


    useEffect(() => {
        const fetch = async () => {
            if (!selectedDay) return
            const bookings = await GetBookings({ date: selectedDay,serviceId: service.id})
            setDayBookings(bookings)
        }
        fetch()
    },[selectedDay,service.id])

    const handleBookingClick = () => {
        if (data?.user) {
            return setbookingSheetIsOpen(true)
        }
        return setSignInDialogIsOpen(true)
    }
    
    const handleBookingSheetOpenChange = () => {
        setSelectedDay(undefined)
        setSelectedTime(undefined)
        setDayBookings([])
        setbookingSheetIsOpen(false)
    }
    
    const handleDateSelect = (date: Date | undefined) => {
        setSelectedDay(date)
    }

    const handleTimeSelect =(time: string) => {
        setSelectedTime(time)
    }

    const handleCreateBooking = async () => {
        try {
            if (!selectedDay || !selectedTime) return;
            const hour = Number(selectedTime.split(":")[0])
            const minute = Number(selectedTime.split(":")[1])
            const newDate = set(selectedDay,{
                minutes: minute,
                hours: hour,
            })
            await createBooking({
                serviceId: service.id,
                userId: (data?.user as any).id,
                date: newDate,
            })
            toast.success("Reserva criada com sucesso!")
        } catch (error) {
            console.error(error)
            toast.error("Erro ao criar reserva!")
        }
    }
    const TimeList = useMemo(() => {
        if (!selectedDay) return []
        return getTimeList({
            bookings: dayBookings,
            selectedDay,
        })
    },[dayBookings,selectedDay])

    
    return (
        <>
        <Card className="  rounded-xl">
            <CardContent className=" flex items-center gap-3 p-3 ">
                    {/* IMAGE */}
                    <div className=" relative min-h-[110px] min-w-[110px] max-w-[110px] max-h-[110px]">
                        <Image alt="service.name" src={service.imageUrl} fill className=" rounded-xl object-cover"/>
                    </div>
                    {/* DIREITA */}
                    <div className=" space-y-2">
                        <h3 className=" font-semibold">{service.name}</h3>
                        <p className=" text-sm text-gray-400">{service.description}</p>

                        <div className="flex items-center justify-between ">
                        <p className=" text-sm font-bold text-primary">
                            {Intl.NumberFormat("pt-BR",{ style: "currency",currency: "BRL",}).format(Number(service.price))}
                        </p>
                        <Sheet open={bookingSheetIsOpen} onOpenChange={handleBookingSheetOpenChange}>
                                <Button variant="secondary" size="sm" className=" uppercase text-primary rounded-xl" onClick={handleBookingClick}>
                                reservar
                                </Button>
                            <SheetContent className="px-0 overflow-y-auto [&::-webkit-scrollbar]:hidden">
                                <SheetHeader>
                                    <SheetTitle >Reservar</SheetTitle>
                                </SheetHeader>
                                <div className=" border-b border-solid py-5">
                                    <Calendar mode="single" locale={ptBR}
                                    fromDate={addDays(new Date(),0)}
                                    selected={selectedDay}
                                    onSelect={handleDateSelect}
                                    styles={{
                                        head_cell: {
                                        width: "100%",
                                        textTransform: "capitalize",
                                        },
                                        cell: {
                                        width: "100%",
                                        },
                                        button: {
                                        width: "100%",
                                        },
                                        nav_button_previous: {
                                        width: "32px",
                                        height: "32px",
                                        },
                                        nav_button_next: {
                                        width: "32px",
                                        height: "32px",
                                        },
                                        caption: {
                                        textTransform: "capitalize",
                                        },
                                    }}/>
                                </div>
                                {selectedDay && (
                                    <div className=" border-b border-solid p-5 gap-3 [&::-webkit-scrollbar]:hidden flex overflow-x-auto px-5">
                                        {TimeList.length > 0 ? TimeList.map((time) => (
                                            <Button className=" rounded-full" key={time} variant={selectedTime === time ? "default" : "outline"}onClick={() => handleTimeSelect(time)}>
                                                {time}
                                            </Button>
                                        )) : <p className=" text-xs">Não há mais horários disponiveis para este dia!</p> }
                                    </div>
                                )}
                                {selectedTime && selectedDay && (
                                    <div className="p-5">
                                        <Card >
                                            <CardContent className="p-3 space-y-3">
                                                <div className=" flex justify-between items-center">
                                                    <h2 className=" font-bold">{service.name}</h2>
                                                    <p className=" text-sm font-bold">
                                                        {Intl.NumberFormat("pt-BR",{ style: "currency",currency: "BRL",}).format(Number(service.price))}
                                                    </p>
                                                </div>
                                                <div className=" flex justify-between items-center">
                                                    <h2 className=" text-sm">Data</h2>
                                                    <p className=" text-sm">
                                                        {format(selectedDay,"d 'de' MMM",{locale: ptBR})}
                                                    </p>
                                                </div>
                                                <div className=" flex justify-between items-center">
                                                    <h2 className=" text-sm">Horário</h2>
                                                    <p className=" text-sm">
                                                        {selectedTime}
                                                    </p>
                                                </div>
                                                <div className=" flex justify-between items-center">
                                                    <h2 className=" text-sm">Barbearia</h2>
                                                    <p className=" text-sm">
                                                        {barbershop.name}
                                                    </p>
                                                </div>
                                                <SheetFooter className="pz-5">
                                                    <SheetClose asChild>
                                                        <Button onClick={handleCreateBooking}>Confirmar</Button>
                                                    </SheetClose>
                                                </SheetFooter>
                                            </CardContent>
                                        </Card>
                                    </div>
                                )}
                            </SheetContent>
                        </Sheet>
                        </div>
                    </div>
            </CardContent>
        </Card>
        <Dialog open={SignInDialogIsOpen} onOpenChange={(open) => setSignInDialogIsOpen(open)}>
            <DialogContent>
                <SignInDialog/>
            </DialogContent>
        </Dialog>
        </>
    )
}


export default ServiceItem;