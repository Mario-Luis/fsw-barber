import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import Image from "next/image";


const SignInDialog = () => {
    const handleLoginWithGoogleleClick = () => signIn ("google")
    return ( 
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
    );
}

export default SignInDialog;