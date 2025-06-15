// In your page.tsx
"use client";

import { ErrorComp } from "@/app/components/ErrorComp";
import GenericSearch from "@/app/components/SearchComp";
import { useRouter } from "next/navigation";
import { Input } from "@/app/components/Input";

import { useState, useEffect } from "react";

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
      renderResult={(user, index) => (
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

type Course = {
  id: string;
  name: string;
  description?: string;
};

export const SearchPageCourse = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchResultData = async (query: string) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/courses/search?q=${query}`);
      if (!res.ok) throw new Error("Search failed");
      const data = await res.json();
      console.log("this is the course", data);
      setResults(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query.length > 2) {
      const timeout = setTimeout(() => {
        fetchResultData(query);
      }, 300); // debounce
      return () => clearTimeout(timeout);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="relative w-full max-w-md">
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search courses..."
        className="w-full p-2 border rounded-md border-midnight-blue-700 hover:border-midnight-blue-800"
      />
      {loading && <p className="text-sm text-gray-500">Searching...</p>}
      {error && <ErrorComp error={error} />}
      {results.length > 0 && (
        <div className="absolute mt-1 md:w-lg bg-white border border-gray-200 rounded-md divide-y shadow-lg z-50 max-h-80 overflow-y-auto">
          {results.map((course) => (
            <div
              key={course.id}
              className="p-2 hover:bg-gray-100 border-b-2 border-midnight-blue-950 cursor-pointer"
              onClick={() => router.push(`/course/${course.id}`)}
            >
              <h3 className="font-medium text-midnight-blue-600">
                {course?.title}
              </h3>
              {course?.description && (
                <p className="text-md text-midnight-blue-950 mt-2">
                  {course?.description.length > 50
                    ? course?.description.slice(0, 50) + "..."
                    : course?.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
