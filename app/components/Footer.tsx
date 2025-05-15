import React from "react";
import Image from "next/image";

import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

function Footer() {
  return (
    <footer className="sticky bg-midnight-blue-950 p-2 z-50">

      <div className="flex justify-center place-content-between flex-col md:flex-row lg:flex-row  object-contain md:gap-12 gap-1">
        <div className="flex justify-around mr-3">
          <Image
            src={"/pytechh.png"}
            width={40}
            height={40}
            alt="Picture of the logo"
          />
          <div className="flex justify-center p-1  text-midnight-blue-100">
            <p className="m-1">All rights reserved</p>
            <p className="m-1">&copy; pythechh.com</p>
          </div>
        </div>

        <div className="flex justify-between text-midnight-blue-50 m-1 ml-3 p-1 gap-4">
          <div className="ml-1">
            <a href="https://www.example.com">
              <YouTubeIcon />
            </a>
          </div>
          <div className="ml-3 mr-1">
            <a href="https://www.example.com">
              <LinkedInIcon />
            </a>
          </div >
          <div className="ml-1">
            <a href="https://www.example.com">
              <InstagramIcon />
            </a>
          </div>
          <div className="ml-1">
            <a href="https://www.example.com">
              <XIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
