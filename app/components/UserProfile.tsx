"use client"

import { useEffect, useState } from "react";
import ProfileForm from "./ProfileForm";
import { useParams, useRouter } from "next/navigation";
import Loading from "./Loading";
import Avatar from "./Avatar";
import CenterComp from "./Centercomp";
import { Button } from "./Button";
import { useSession } from "next-auth/react";

export default function UserProfile() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();

  const session = useSession();

  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/profile?userId=${userId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });

        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setUser(data?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) return <Loading />;
  if (!user) return <p className="text-center text-gray-500">User not found.</p>;

  return (
    <CenterComp className="max-w-3xl mx-auto px-4 py-8 w-full">
      {session.data?.user.id === user.id && <h1 className="text-3xl font-bold text-midnight-blue-900 mb-6 text-center">
        Welcome, {user.name}
      </h1>}

      {user.profile ? (
        <div className="bg-white shadow-lg rounded-lg p-6 space-y-4 border border-gray-200">
          <div className="flex items-center gap-4">
            <Avatar imageUrl={user?.profile?.imageUrl} />
            <div>
              <h2 className="text-xl font-semibold text-midnight-blue-800">{user.name}</h2>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold text-midnight-blue-700 mb-1">Bio</h3>
            <p className="text-gray-800 leading-relaxed">{user.profile.bio}</p>
          </div>

          {session.data?.user.id === user.id &&<Button className="bg-midnight-blue-900 font-bold text-midnight-blue-50 mb-1" onClick={()=>router.push(`/edit/${user.id}`)} >Edit</Button>}
        </div>
      ) : (
       (session.data?.user.id === user.id &&  <div className="bg-white border border-gray-200 rounded-lg shadow p-6 space-y-4">
          <p className="text-gray-600">You don’t have a profile yet. Fill in your details below:</p>
          <ProfileForm
            userId={user.id}
            onProfileCreated={(profile) => setUser({ ...user, profile })}
          />
        </div>)
      )}
    </CenterComp>
  );
}

