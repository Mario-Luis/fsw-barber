import Image from "next/image";
import { Card,CardContent } from "./card";
import { Button } from "./button";
import { MenuIcon } from "lucide-react";


const Header = () => {
    return (
        <Card>
            <CardContent className="p-5 flex flex-row justify-between items-center ">
                <Image alt="FSW-Barber" src="/logo.png" height={18} width={120} />
                <Button size="icon" variant="outline">
                    <MenuIcon className=" text-primary"/>
                </Button>
            </CardContent>
        </Card>
    )
}

export default Header