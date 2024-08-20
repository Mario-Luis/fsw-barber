"use client"

import { Calendar, CalendarIcon, HomeIcon,LogInIcon, LogOutIcon, MenuIcon } from "lucide-react";
import { SheetTrigger,Sheet, SheetContent, SheetTitle, SheetHeader, SheetClose } from "./ui/sheet";
import { Button } from "./ui/button";
import quickSearchOptions from "../_constants/search";
import Image from "next/image";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./ui/dialog";
import { DialogHeader } from "./ui/dialog";
import { signIn, signOut, useSession } from "next-auth/react";




const SidebarSheet = () => {
const {data} = useSession()
const handleLoginWithGoogleleClick = () => signIn ("google")
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
                            <DialogContent className=" max-w-[270px]">
                                    <DialogHeader>
                                        <DialogTitle>Fazer login</DialogTitle>
                                            <DialogDescription>
                                            Logar com Google
                                        </DialogDescription>
                                    </DialogHeader>
                            <Button variant="outline" className=" gap-1" onClick={handleLoginWithGoogleleClick} >
                                <Image alt="Logar com Google" src="/icons8-google-94.png" height={18} width={18}/>
                                Google
                            </Button>
                            </DialogContent>
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
                    <Button variant="ghost" className=" gap-1 justify-start" onClick={handleLogoutClick} >
                        <LogOutIcon size={18}/>
                        Sair da conta                        
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}

export default SidebarSheet;