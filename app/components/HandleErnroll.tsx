"use client";

import { Button } from "./Button";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ErrorComp } from "@/app/components/ErrorComp";
import { useRouter } from "next/navigation";

interface Enroll {
  courseId: string;
}

export default  function HandleEnroll ({ courseId }: Enroll) {
  const session = useSession();
  const [error, setError] = useState('');
  const [alreadyEnrolled, setAlreadyEnrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkEnrollment = async () => {
      const userId = session?.data?.user?.id;
      if (!userId) return;

      const res = await fetch("/api/courses/checkenrollment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, courseId }),
      });

      const data = await res.json();
      if (data.enrolled) setAlreadyEnrolled(true);
    };

    checkEnrollment();
  }, [session.status, session.data, courseId]);

  const handleEnroll = async () => {
    try {
      const userId = session?.data?.user?.id;

      const response = await fetch("/api/courses/enroltocourse/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, courseId }),
      });

      if (!response.ok) {
        const resData = await response.json();

        if (response.status === 409) {
          setAlreadyEnrolled(true);
        } else {
          setError(resData.error || "Error while enrollment");
          setAlreadyEnrolled(false);
        }

        return;
      }

      const data = await response.json();
      console.log(data);
      setError("");
      router.push("/");
    } catch (error) {
      console.log(error);
      setError("Internal server error");
    }
  };

  return (
    <div>
      <div className="flex justify-end">
        <Button
          variant="outline"
          className="text-midnight-blue-50 bg-amber-950 hover:bg-amber-800 cursor-pointer"
          onClick={session?.data?.user ? handleEnroll : ()=>signIn()}
          disabled={alreadyEnrolled}
        >
          {(alreadyEnrolled ? "Already Enrolled" : "Enroll now")}
        </Button>
      </div>
      {error && <ErrorComp error={error} />}
    </div>
  );
};
