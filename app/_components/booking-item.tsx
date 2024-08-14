import { Badge } from "./ui/badge";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Card, CardContent } from "./ui/card";

const BookingItem = () => {
    return (
        <>
                <p className=" mt-6 mb-3 font-bold uppercase text-xs text-gray-400 ">agendamentos</p>
        <Card className=" rounded-xl" >
        <CardContent className="flex justify-between p-0 ">
        {/* DIV DA ESQUERDA */}
        <div className="flex flex-col pl-5 py-5 gap-2 ">
        <Badge className="w-fit uppercase ">Confirmado</Badge>
        <h3 className="font-semibold ">Corte de Cabelo</h3>

        <div className="flex items-center gap-2 ">
        <Avatar className="h-9 w-9 ">
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
        </>
    );
}

export default BookingItem