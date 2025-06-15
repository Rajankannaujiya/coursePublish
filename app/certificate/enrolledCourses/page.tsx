// Inside a React component (e.g., Dashboard.tsx)
"use client"
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import CenterComp from '@/app/components/Centercomp';
import { useRouter } from 'next/navigation';
import Loading from '@/app/components/Loading';

export default function EnrolledCourses() {
  const { data: session, status } = useSession();
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchCourseCount = async () => {
      if (status !== 'authenticated') return;

      try {
        const res = await fetch('/api/certificate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        const data = await res.json();

        console.log(data)
        if (res.ok) {
          setCourses(data.enrolledCourses);
        } else {
          console.error('Failed to fetch:', data.error);
        }

      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseCount();
  }, [status, session]);

  if (loading) return <Loading />;

  return (
    <CenterComp className="flex justify-center w-full p-4 bg-gray-50 min-h-screen">
    <div className="w-full max-w-4xl space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">Enrolled Courses</h2>
  
      {courses && courses.length > 0 ? (
        courses.map((course:any, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition duration-300 cursor-pointer"
            onClick={()=>router.push(`/certificate/${course?.id}`)}
          >
            <h3 className="text-xl font-bold text-midnight-blue-900 mb-2">
              {course?.title}
            </h3>
            <p className="text-gray-600">{course?.description}</p>
          </div>
        ))
      ) : (
        <div className="text-gray-500 italic">You are not enrolled in any courses yet.</div>
      )}
    </div>
  </CenterComp>
  
  );
}
