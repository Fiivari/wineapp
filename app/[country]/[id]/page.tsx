'use client'
import { wines } from "@/constants";
import Image from "next/image";

const Wine = ({ params }: { params: { id: number, country: string } }) => {
    const countryArray = wines.find(array => array.name === params.country) || wines.find(array => array.name === 'austria');

    const wine = countryArray?.wines.find(wine => wine.id == params.id)
    
    return (
        <div className="p-12 mx-[20%] flex justify-center">
            <div className="mr-64">
                <h1 className="text-6xl my-12 capitalize">{wine?.title}</h1>
                <p>{wine?.desc}</p>
            </div>
            <Image 
                src={wine?.image || "/bottle.png"}
                width={117}
                height={500}
                alt="bottle"
            />
        </div>
    )
}

export default Wine