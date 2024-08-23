import { Badge } from "./ui/badge";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Card, CardContent } from "./ui/card";
import { Prisma } from "@prisma/client"

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
    return (
        <>
        <Card className="  mt-5 rounded-xl" >
            <CardContent className="flex justify-between p-0 ">
                {/* DIV DA ESQUERDA */}
                <div className="flex flex-col pl-5 py-5 gap-2 ">
                    <Badge className="w-fit uppercase ">Confirmado</Badge>
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
                    <p className=" text-sm pb-3">Agosto</p>
                    <p className=" text-4xl ">05</p>
                    <p className="text-sm pt-3">20:00</p>
                </div>
            </CardContent>
        </Card>
        </>
    );
}

export default BookingItem