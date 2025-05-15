"use client"

import Image from "next/image";
import React from "react";
import { Button } from "./Button";
import { useRouter } from "next/navigation";

const FrontView = () => {
  const router = useRouter();
  return (
    <div className="w-full flex items-center justify-between p-4 bg-midnight-blue-50">
      <div className="w-full max-w-screen overflow-hidden">
        <div className="container mx-auto px-4 py-20 flex flex-col lg:flex-row justify-between items-center">
          <div className="flex flex-col mb-8 lg:mb-0 lg:mr-8 lg:w-1/2">
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-midnight-blue-800">
                Hii, Welcome to the <span className="text-midnight-blue-950 text-4xl md:text-5xl">pytechh</span>
              </h1>
              <h2 className="text-xl md:text-2xl mb-4 text-midnight-blue-950">Where Curiosity Meets Mastery</h2>
              <p className="text-lg md:text-xl text-midnight-blue-950">Learn all the skills you need to start your career</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" className="bg-midnight-blue-900 text-midnight-blue-50 cursor-pointer">Start Now</Button>
              <Button variant="outline" className="bg-midnight-blue-300 text-midnight-blue-800 cursor-pointer" onClick={()=>router.push("/course/allcourses")}>Explore Courses</Button>
            </div>
          </div>
          <div className="relative w-full max-w-lg aspect-square mt-8 lg:mt-0">
            <Image
              src="/pytechhgrpstudy.jpg"
              alt="study image"
              fill
              className="object-cover rounded-lg"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontView;