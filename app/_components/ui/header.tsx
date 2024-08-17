import Image from "next/image";
import { Card,CardContent } from "./card";
import { Button } from "./button";
import { MenuIcon } from "lucide-react";
import SidebarSheet from "@/app/_components/sidebar-sheet"


const Header = () => {
    return (
        <Card>
            <CardContent className="p-5 flex flex-row justify-between items-center ">
                <Image alt="FSW-Barber" src="/logo.png" height={18} width={120} />
                <SidebarSheet/>
            </CardContent>
        </Card>
    )
}

export default Header