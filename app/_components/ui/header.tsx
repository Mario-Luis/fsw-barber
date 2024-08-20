import Image from "next/image";
import { Card,CardContent } from "./card";
import SidebarSheet from "@/app/_components/sidebar-sheet"
import Link from "next/link";


const Header = () => {
    return (
        <Card>
            <CardContent className="p-6 flex flex-row justify-between items-center ">
                <Link href="/">
                    <Image alt="FSW-Barber" src="/logo.png" height={18} width={120} />
                </Link>
                <SidebarSheet/>
            </CardContent>
        </Card>
    )
}

export default Header