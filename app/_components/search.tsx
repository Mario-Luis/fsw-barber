"use client"

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";

const formSchema = z.object({
    Search: z.string(). trim().min(1,{
        message:"Opçāo invalida!",
    }),
})


const Search = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        Search: "",
        },
    })
const router = useRouter()
const handleSubmit = (data: z.infer<typeof formSchema>) => {
    router.push(`/barbershops?search=${data.Search}`)
}

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className=" mt-3 flex gap-2">
                <FormField control={form.control} name="Search" render={({ field }) => (
                    <FormItem className=" w-full ">
                        <FormControl>
                            <Input placeholder="Buscar...." {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit">
                    <SearchIcon/>
                </Button>
            </form>
        </Form>
    )
}

export default Search;