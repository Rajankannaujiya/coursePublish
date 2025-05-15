"use client";

import Image from "next/image";
import React, { useState } from "react";

import { useRouter } from "next/navigation";
import { Button } from "./Button";
import { signOut, useSession } from "next-auth/react";
import { activeUserGauge } from "../lib/metrics";

const Avatar = ({ imageUrl }: { imageUrl: string }) => {

  const session = useSession();
  const [showMenu, setShowMenu] = useState(false);

  return (session.data?.user &&
    <div className="flex items-center" onClick={() => setShowMenu(!showMenu)}>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="User Avatar"
          width={40}
          height={40}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 object-cover"
        />
      ) : (
        <div className="relative w-8 h-8 sm:w-10 sm:h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <svg
            className="absolute w-9 h-9 sm:w-11 sm:h-11 text-gray-400 -left-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
      {showMenu && <HandleIfSignIn />}
    </div>
  );
};

function HandleIfSignIn() {
  const router = useRouter();
  const session = useSession();
  return (
    <div className="flex justify-end flex-col bg-midnight-blue-950 rounded-md absolute top-18 right-0 end-0 m-0 z-50 p-6">
      <Button className="hover:bg-midnight-blue-500" onClick={()=>router.push(`/profile/${session.data?.user.id}`)}>Profile</Button>
      {session.data?.user?.role === "ADMIN" && (
        <Button
          className="hover:bg-midnight-blue-500"
          onClick={() => router.push("/admin/users/")}
        >
          All Users
        </Button>
      )}
      {session.data?.user?.role === "ADMIN" && (
        <Button
          className="hover:bg-midnight-blue-500"
          onClick={() => router.push("/admin/instructor/")}
        >
          All Instructors
        </Button>
      )}
      {session.data?.user?.role === "ADMIN" && (
        <Button
          className="hover:bg-midnight-blue-500"
          onClick={() => router.push("/course/addcourse")}
        >
          Add Course
        </Button>
      )}
      {session.data?.user?.role === "ADMIN" && (
        <Button
          className="hover:bg-midnight-blue-500"
          onClick={() => router.push("/admin/partners")}
        >
          Add Partners
        </Button>
      )}
      {session.data?.user?.role === "ADMIN" && (
        <Button
          className="hover:bg-midnight-blue-500"
          onClick={() => router.push("/admin/instructor/makeinstructor/")}
        >
          Make Instructor
        </Button>
      )}{" "}
<Button
  className="hover:bg-midnight-blue-500"
  onClick={async () => {
    await fetch('/api/metrics/active-user', {
      method: 'DELETE',
    });

    signOut({ callbackUrl: '/' });
  }}
>
  Logout
</Button>
    </div>
  );
}

export default Avatar;
