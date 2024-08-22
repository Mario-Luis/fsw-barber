"use client"

import { CalendarIcon, HomeIcon,LogInIcon, LogOutIcon, MenuIcon } from "lucide-react";
import { SheetTrigger,Sheet, SheetContent, SheetTitle, SheetHeader, SheetClose } from "./ui/sheet";
import { Button } from "./ui/button";
import quickSearchOptions from "../_constants/search";
import Image from "next/image";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./ui/dialog";
import { DialogHeader } from "./ui/dialog";
import { signIn, signOut, useSession } from "next-auth/react";
import SignInDialog from "./sign-in-dialog";




const SidebarSheet = () => {
const {data} = useSession()
const handleLogoutClick = () => signOut()

    return ( 
        <Sheet >
            <SheetTrigger asChild>
                <Button size="icon" variant="secondary" className=" absolute right-4 top-4">
                    <MenuIcon className=" text-primary"/>
                </Button>
            </SheetTrigger>
            <SheetContent className=" max-w-[280px] overflow-y-auto">
                <SheetHeader>
                    <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>
                <div className=" gap-2 py-5 border-b border-solid flex items-center">
                    {data?.user? (
                        <div className=" flex items-center gap-2">
                            <Avatar>
                                <AvatarImage  src={data?.user.image ?? ""}/>
                            </Avatar>
                            <div>
                                <p className=" font-bold">{data?.user?.name}</p>
                                <p className=" text-xs">{data?.user?.email}</p>
                            </div>
                        </div>
                    ) :(
                        <>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="ghost" className=" font-bold text-xl justify-start gap-3">
                                    <LogInIcon size={25}/>
                                    Fazer login
                                </Button>
                            </DialogTrigger>
                            <SignInDialog/>
                        </Dialog>
                        </>
                    )}
                </div>
                <div className=" flex flex-col gap-1 py-3 border-b border-solid ">
                    <SheetClose asChild>
                        <Button asChild variant="ghost" className=" justify-start gap-2">
                            <Link href="/">
                                <HomeIcon size={18} />
                                Inicio
                            </Link>
                        </Button>
                    </SheetClose>
                    <Link href="/bookings">
                        <Button variant="ghost" className=" justify-start gap-1">
                            <CalendarIcon size={18}  />
                            Agendamentos
                        </Button>
                    </Link>
                </div>
                <div className=" flex flex-col gap-1 py-3 border-b border-solid ">
                    {quickSearchOptions.map((option) =>(
                        <SheetClose key={option.title} asChild>
                            <Button asChild variant="ghost" className=" justify-start gap-1">
                                <Link href={`/barbershops?service=${option.title}`}>
                                    <Image alt={option.title} src={option.imageUrl} height={18} width={18}/>
                                    {option.title}
                                </Link>
                            </Button>
                        </SheetClose>
                    ))}
                </div>
                {data?.user &&(
                    <div className=" flex flex-col gap-1 py-3 border-b border-solid ">
                    <Button variant="ghost" className=" gap-1 justify-start" onClick={handleLogoutClick} >
                        <LogOutIcon size={18}/>
                        Sair da conta                        
                    </Button>
                </div>
                )}
            </SheetContent>
        </Sheet>
    );
}

export default SidebarSheet;