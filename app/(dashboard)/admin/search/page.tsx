// In your page.tsx
"use client";

import GenericSearch from "@/app/components/SearchComp";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  const fetchResultData = async (query: string) => {
    const res = await fetch(`/api/users/search?q=${query}`);
    const data = res.json;
    console.log(data);
    return await res.json();
  };

  return (
    <GenericSearch
      fetchResults={fetchResultData}
      renderResult={(user:any, index) => (
        <div
          key={index}
          className="flex justify-between items-center gap-3 cursor-pointer"
          onClick={() => router.push(`/profile/${user?.id}`)}
        >
          <div>
            <h4 className="font-medium text-midnight-blue-900">{user?.name}</h4>
            <p className="text-sm text-midnight-blue-700">{user?.email}</p>
          </div>
          <div>
            <h2 className="text-mdium text-midnight-blue-900 ">{user?.role}</h2>
          </div>
        </div>
      )}
      placeholder="Search users..."
      minChars={3}
      className="max-w-2xl mx-auto"
    />
  );
}

