import React from 'react'
import Image from "next/image";

const HomeMenu = () => {
  return (
    <section>
        <div className='absolute left-0 right-0 w-full'>
            <div className="absolute left-0 -top-[70px] text-left -z-10">
                <Image src={'/sallad1.png'} width={109} height={189}  alt={'sallad'} />
            </div>
            <div className="absolute -top-[100px] right-0 -z-10">
                <Image src={'/sallad2.png'} width={107} height={195} alt={'sallad'} />
            </div>
            <div className='text-center'>
                <h3 className='uppercase text-gray-500 font-semibold leading-4'>Checkout</h3>
                <h2 className='text-primary font-bold text-4xl italic'>Menu</h2>
            </div>
        </div>
        
    </section>
 
  )
}

export default HomeMenu
