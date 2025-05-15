

import Image from 'next/image'
import { getAllBrand } from '../actions/brand'
import PartnerUpdateAndDel from './PartnerUpdateAndDel';


const Brand = async() => {
const partners = await getAllBrand();


  return (
    <div className='w-full flex flex-col items-center justify-center bg-midnight-blue-100 p-8'>
    <h2 className='text-midnight-blue-950 mb-6 text-xl font-bold'>We collaborate with the top Leading companies of today</h2>
    <div className="flex flex-wrap">
      
       <div className='flex justify-center gap-12'>
       {partners.data && partners.data?.length>0 && partners.data?.map((partner, index)=>(
        <div
        className="relative bg-white rounded-lg shadow-md p-4 w-full max-w-xs"
        key={index}
      >
        <div className="absolute left-0 z-50">
          <PartnerUpdateAndDel partnerId={partner.id}/>
        </div>  
      
        {/* Brand content */}
        <div className="flex flex-col items-center space-y-2">
          <Image
            src={partner.bLogo}
            alt="brand image"
            width={100}
            height={100}
            className="rounded-full object-cover"
          />
          <h3 className="text-lg font-semibold text-center">{partner.bName}</h3>
        </div>
      </div>
        
        )
        )}
       </div>
    
    </div>
  </div>
  )
}

export default Brand