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
    const bookings = await db.booking.findMany({
        where: {
            userId: (session.user as any).id,
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
            <div className="p-5">
                <p className=" font-bold uppercase text-xs text-gray-400 ">agendamentos</p>
                {bookings.map(booking => <BookingItem key={booking.id} booking={booking}/>)}
            </div>
        </>
    )
}

export default Bookings; 