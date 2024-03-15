'use client'
import Image from 'next/image'
import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { wines } from '@/constants'
import Link from 'next/link'

const Country = ({ params }: { params: { country: string } }) => {
    const [width, setWidth] = useState(0);
    const carousel = useRef<HTMLDivElement>(null);

    const countryArray = wines.find(array => array.name === params.country) || { name: '', wines: [] };

    useEffect(() => {
        if (carousel.current) {
            setWidth(400 + carousel.current.scrollWidth - carousel.current.offsetWidth);
        }
    }, []);

    return (
        <section className="p-12 mx-[10%]">
            <h1 className="text-6xl mb-2 capitalize">{params.country.replace(/-/g, ' ')}</h1>
            {countryArray?.wines.length > 0 ? (
                <motion.div ref={carousel} className="overflow-hidden cursor-grab relative" whileTap={{ cursor: "grabbing" }}>
                    <div className="carousel-overlay"></div>
                    <motion.div 
                        drag="x"
                        dragConstraints={{ right: 400, left: -width }} 
                        className="flex carousel-inner"
                    >
                        {countryArray?.wines.map((wine) => (
                            <motion.div className="p-6 min-w-[250px]" key={wine.id}>
                                <Image 
                                    src={wine.image}
                                    width={117}
                                    height={500}
                                    alt="bottle"
                                />
                                <div className="text-3xl font-bold">{wine.price}€</div>
                                <Link href={`/${params.country}/${wine.id}`} className="text-xl p-1 border-b-2 border-wine-red">Select</Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            ) : (
                <div className="text-2xl p-6 mt-12 flex justify-between">
                    <div>
                        <p className="mb-6">No wines available from this country</p>
                        <Link href="/">
                            <span className="py-2 px-4 bg-wine-red text-white w-20 rounded-lg">Back</span>
                        </Link>
                    </div>
                    <div>
                        <Image 
                            src="/wine-spill.png"
                            width={300}
                            height={300}
                            alt="wine spill"
                        />
                    </div>
                </div>
            )}
        </section>
    )
}

export default Country