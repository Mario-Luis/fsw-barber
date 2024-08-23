import { getServerSession } from "next-auth";
import Header from "../_components/ui/header";
import { notFound } from "next/navigation";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";
import BookingItem from "../_components/booking-item";


const Bookings = async () => {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        return notFound()
    }
    const confirmedBookings = await db.booking.findMany({
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
        }
    })

    const concludedBookings = await db.booking.findMany({
        where: {
            userId: (session.user as any).id,
            date: {
                lt: new Date()
            }
        },
        include: {
            service: {
                include: {
                    barbershop: true
                }
            }
        }
    })


    
    return ( 
        <>
            <Header/>
            <div className="p-7 space-y-3">
                <p className=" font-bold uppercase text-xl ">agendamentos</p>
                <p className="mt-6 mb-3 font-bold uppercase text-xs text-gray-400 ">Confirmados</p>
                {confirmedBookings.map(booking => <BookingItem key={booking.id} booking={booking}/>)}
            </div>
            <div className="p-6 space-y-3">
                <p className=" mb-3 font-bold uppercase text-xs text-gray-400 ">Finalizados</p>
                {concludedBookings.map(booking => <BookingItem key={booking.id} booking={booking}/>)}
            </div>
        </>
    )
}

export default Bookings; 