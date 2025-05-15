import React from 'react';
import CenterComp from '../components/Centercomp';
import Image from 'next/image';

const Page = () => {
  return (
    <CenterComp className='flex justify-center items-center w-full lg:max-w-5xl overflow-hidden rounded-lgmt-20 m-4 p-4 min-h-[80vh] bg-gradient-to-br from-white/90 to-blue-50/70 shadow-lg overflow-y-scroll no-scrollbar'>
      <div className='w-full flex flex-col justify-center items-center rounded-lg gap-6 animate-fade-in'>
        {/* Image Section with Hover Effect */}
        <div className='m-4 p-3 items-center w-full max-w-3xl group'>
          <div className='overflow-hidden rounded-lg shadow-md mt-96  '>
            <Image 
              src={'/pytechhstudy.jpg'} 
              alt='about us image' 
              width={800} 
              height={450} 
              className='w-full rounded-lg transform transition-transform duration-500 group-hover:scale-105'
              priority
            />
          </div>
        </div> 

        <div className='flex flex-col m-3 p-4 w-full max-w-3xl space-y-6'>
          <h1 className='p-2 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-800 text-4xl md:text-5xl leading-tight'>
            Hi! Welcome to <span className='underline decoration-wavy decoration-amber-400'>Pytechh</span>
          </h1>
          
          <div className='space-y-4'>
            <p className='p-2 text-gray-700 text-lg leading-relaxed transition-all hover:text-gray-900 hover:bg-blue-50/50 hover:px-3 rounded-lg'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia hic ipsam consectetur nam, deserunt dolores autem molestias quasi neque natus odio unde porro rerum impedit quam ratione exercitationem at nisi.
              Sunt, ratione! Dolorum rerum architecto reprehenderit quis aliquam veniam asperiores consectetur recusandae ipsam quo voluptates, ad officiis temporibus.
            </p>

            <p className='p-2 text-gray-700 text-lg leading-relaxed transition-all hover:text-gray-900 hover:bg-blue-50/50 hover:px-3 rounded-lg'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, quisquam. Tempora nobis numquam necessitatibus, voluptatem perferendis quasi ut, aut quibusdam temporibus repudiandae enim obcaecati consectetur at quo deleniti, labore doloremque!
              Reprehenderit nesciunt corporis in cupiditate? Illum tempore sunt pariatur inventore velit fuga neque molestiae ab error minus porro.
            </p>
          </div>

          <div className='flex space-x-4 mt-6'>
            <div className='h-2 w-20 bg-cyan-500 rounded-full'></div>
            <div className='h-2 w-12 bg-blue-400 rounded-full'></div>
            <div className='h-2 w-8 bg-violet-400 rounded-full'></div>
          </div>
        </div>
      </div>
    </CenterComp>
  );
};

export default Page;