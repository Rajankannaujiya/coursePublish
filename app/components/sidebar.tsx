"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useSession } from "next-auth/react";

function SideBar() {
  const [openSidebar,setOpenSidebar ] = useState(false);
  console.log(openSidebar)

  const session = useSession();

  const router= useRouter();

  return (
    (openSidebar ? <div className="max-h-screen flex overflow-hidden z-60 relative">
      <nav
        aria-label="Sidebar"
        className="narrow-sidebar  block flex-shrink-0 bg-midnight-blue-950 overflow-y-auto z-10"
      >
          <div className="flex justify-end m-1">
    <div className="p-2 hover:bg-midnight-blue-600 rounded-sm w-fit" onClick={()=>setOpenSidebar(false)}>
    <CloseIcon className="text-midnight-blue-50"/>
    </div>
  </div>
        <div className="relative w-40 flex space-y-16 flex-col p-3 object-contain">
          <div className="flex mr-4 pr-4 mt-4 mb-2 pt-3 pb-2 hover:bg-midnight-blue-600 rounded-sm w-full"
          onClick={() => router.push('/')}
          >
            <div className="flex-shrink-0 inline-flex items-center justify-center w-14">
              <HomeIcon className="text-midnight-blue-50"/>
            </div>
            <div className="text-center text-xm font-normal text-midnight-blue-100">
              Home
            </div>
          </div>
          <div className="flex mr-4 pr-4 mt-4 mb-2 pt-3 pb-2 hover:bg-midnight-blue-600 rounded-sm w-full"
          onClick={()=>router.push('/course/allcourses')}
          >
         <div className="flex-shrink-0 inline-flex items-center justify-center w-14">
            <MenuBookIcon className="text-midnight-blue-50" />
          </div>
          <div className="text-center text-xm font-normal text-midnight-blue-50">
            Courses
          </div>
         </div>

         <div className="flex mr-4 pr-4 mt-4 mb-2 pt-3 pb-2 hover:bg-midnight-blue-600 rounded-sm w-full"
         onClick={()=>router.push('/about/')} 
         >
         <div className="flex-shrink-0 inline-flex items-center justify-center w-14">
            <GroupsIcon className="text-midnight-blue-50" />
          </div>
          <div className="text-center text-xm font-normal text-midnight-blue-100">
            About Us
          </div>
         </div>

        {session.data?.user && <div className="flex mr-4 pr-4 mt-4 mb-2 pt-3 pb-2 hover:bg-midnight-blue-600 rounded-sm w-full"
         onClick={()=>router.push('/certificate/')}
         >
         <div className="flex-shrink-0 inline-flex items-center justify-center w-14">
            <PersonIcon className="text-midnight-blue-50" />
          </div>
          <div className="text-center text-xm font-normal text-midnight-blue-50">
            Certificate
          </div>
         </div>}

        </div>
      </nav>
    </div>: <div className="flex items-start p-2 z-50 fixed">
  <button
    className="p-3 bg-midnight-blue-950 hover:bg-midnight-blue-600 rounded-sm"
    onClick={() => setOpenSidebar(true)}
  >
    <MenuIcon  className="text-midnight-blue-50"/>
  </button>
</div>)
  );
}

export default SideBar;
