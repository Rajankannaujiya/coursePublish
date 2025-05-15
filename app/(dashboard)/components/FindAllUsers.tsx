"use client";

import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/app/store/hook";
import { TypeBaseUserSchema } from "@/app/lib/globalType";
import { setAllUser } from "@/app/store/features/userSlice";
import DisplayComp from "./DisplayComp";
import { useRouter } from "next/navigation";
import SearchPageUser from "../admin/search/page";

export default function FindAllUsers({
  users,
}: {
  users: TypeBaseUserSchema[];
}) {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const allUsers = useAppSelector((state) => state.user.data);

  useEffect(() => {
    if (users && users.length > 0) {
      const safeUsers = users.map((user) => ({
        ...user,
        createdAt: new Date(user.createdAt).toISOString() || null,
        updatedAt: new Date(user.updatedAt).toISOString() || null,
      }));

      console.log("safe data", safeUsers);
      dispatch(setAllUser(users));
    }
  }, [users, dispatch]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">

<div className="items-center w-full absolute z-10 right-2 m-2 p-2">
        <SearchPageUser />
      </div>
      <div className=" max-h-screen items-center mt-20 bg-midnight-blue-50 absolute w-md overflow-hidden overflow-y-scroll scroll-smooth z-0 no-scrollbar">
        <div className="text-2xl text-midnight-blue-950 font-extrabold m-2 p-2 border-b-2 border-midnight-blue-950">
          <h1>All Users</h1>
        </div>
        <div className="flex w-full flex-col m-2 p-2">
          {allUsers &&
            allUsers?.map((user) => (
              <div
                key={Math.random()}
                className="w-full border-b-2 border-gray-400"
                onClick={() => router.push(`/profile/${user.id}`)}
              >
                <DisplayComp name={user?.name || ""} role={user.role} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
