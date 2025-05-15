
import authOptions from "@/app/lib/auth";
import { prisma } from "@/app/db";
import { TypeBaseUserSchema } from "@/app/lib/globalType";
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import Fuse from 'fuse.js'
import { cache } from "@/app/db/cache";


const fuzzySearch = (users:TypeBaseUserSchema[], searchQuery: string) => {
    const searchedUsers = new Fuse(users, {
      minMatchCharLength: 2,
      keys: ['name'],
    }).search(searchQuery);
  
    return searchedUsers.map((user) => user.item);
  };

  export async function GET(req: NextRequest) {
    console.log("I have reached");
  
    const session = await getServerSession(authOptions);
  
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  
    const { searchParams } = new URL(req.url);
    const searchQuery = searchParams.get('q');
    if (searchQuery && searchQuery.length > 2) {
      let allUser: TypeBaseUserSchema[] = await cache.get('allUsers', []);
  
      if (!allUser || allUser.length === 0) {
        allUser = await prisma.user.findMany();
        cache.set('allUsers', [], allUser, 300);
      }
  
      return NextResponse.json(fuzzySearch(allUser, searchQuery));
    }
  
    return NextResponse.json(
      { message: 'user not found', status: 400 },
      { status: 400 }
    );
  }