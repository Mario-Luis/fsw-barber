import { SearchIcon } from "lucide-react";
import { Button } from "./_components/ui/button"
import Header from "./_components/ui/header"
import { Input } from "./_components/ui/input"
import Image from "next/image";

const Home = () => {
    return (
        <div>
            <Header />
            <div className="p-5">
                <h2 className="text-xl font-bold">Olá,Mario Luis!</h2>
                <p>Segunda-Feira 5 Agosto.</p>

                <div className="mt-6 flex gap-2 items-center">
                    <Input placeholder=" Buascar..." />
                    <Button>
                        <SearchIcon />
                    </Button>
                </div>
                
                <div className="relative h-[150px] w-full mt-5">
                    <Image alt="baner,agende nos melhores com fsw-barber" src="/banner-01.png" fill className="object-cover rounded-xl" />
                </div>
            </div>
        </div>
    )
}


export default Home