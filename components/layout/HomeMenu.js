import React from 'react'
import Image from "next/image";
import MenuItem from "@/components/Menu/MenuItem";
import SectionHeaders from "@/components/layout/SectionHeader"

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
            <div className="text-center mb-4">
                <SectionHeaders
                    subHeader={'check out'}
                    mainHeader={'Our Best Sellers'} />
            </div>

            <div className='grid grid-cols-3 gap-4'> 
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
            </div>
        </div>
        
    </section>
 
  )
}

export default HomeMenu
