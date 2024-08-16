import { Card, CardContent } from "./ui/card";

const FooterItem = () => {
    return ( 
        <footer>
        <Card className=" mt-5" >
            <CardContent className=" px-7 py-7">
                <p className=" text-xs text-gray-400">
                © 2024 Copyright <span className=" font-bold text-xm">https://github.com/Mario-Luis</span>
                </p>
            </CardContent>
        </Card>
        </footer>
    );
}

export default FooterItem;