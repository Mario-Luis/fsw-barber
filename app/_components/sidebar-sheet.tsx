import { Calendar, CalendarIcon, HomeIcon, Import, LogOutIcon, MenuIcon } from "lucide-react";
import { SheetTrigger,Sheet, SheetContent, SheetTitle, SheetHeader, SheetClose } from "./ui/sheet";
import { Button } from "./ui/button";
import quickSearchOptions from "../_constants/search";
import Image from "next/image";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";




const SidebarShit = () => {
    return ( 
        <Sheet>
            <SheetTrigger asChild>
                <Button size="icon" variant="outline">
                    <MenuIcon className=" text-primary"/>
                </Button>
            </SheetTrigger>
            <SheetContent className=" overflow-y-auto">
                <SheetHeader>
                    <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>
                <div className=" gap-3 py-5 border-b border-solid flex items-center">
                    <Avatar>
                        <AvatarImage  src="/IMG_7561.jpg"/>
                    </Avatar>
                    <div>
                        <p className=" font-bold">Mario Luis</p>
                        <p className=" text-sm">marioluis@gmaiil.com</p>
                    </div>
                </div>
                <div className=" flex flex-col gap-1 py-3 border-b border-solid ">
                    <SheetClose asChild>
                        <Button variant="ghost" asChild className=" justify-start gap-2">
                            <Link href="/">
                            <HomeIcon size={18} />
                            Inicio
                            </Link>
                        </Button>
                    </SheetClose>
                    <Button variant="ghost" className=" justify-start gap-1">
                        <CalendarIcon size={18}  />
                        Agendamentos
                    </Button>
                </div>
                <div className=" flex flex-col gap-1 py-3 border-b border-solid ">
                    {quickSearchOptions.map((option) =>(
                        <Button key={option.title} variant="ghost" className=" justify-start gap-1">
                            <Image alt={option.title} src={option.imageUrl} height={18} width={18}/>
                            {option.title}
                        </Button>
                    ))}
                </div>
                <div className=" flex flex-col gap-1 py-3 border-b border-solid ">
                    <Button variant="ghost" className=" gap-1 justify-start" >
                        <LogOutIcon size={18}/>
                        Sair da conta                        
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}

export default SidebarShit;