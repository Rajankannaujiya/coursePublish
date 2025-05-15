import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/app/lib/auth";
import { prisma } from "@/app/db";
import { cache } from "@/app/db/cache";
import Fuse from "fuse.js";
import { TypeBaseCourseSchema } from "@/app/lib/globalType";

const fuzzySearch = async(courses: TypeBaseCourseSchema[], searchQuery: string) => {
  const fuse = new Fuse(courses, {
    minMatchCharLength: 2,
    keys: ["title"],
    threshold: 0.4, // Optional: Adjust to control fuzziness
  });

  return fuse.search(searchQuery).map((result) => result.item);
};

export async function GET(req: NextRequest) {
  console.log("in the search course")
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const searchQuery = searchParams.get("q");

  if (!searchQuery || searchQuery.length <= 2) {
    return NextResponse.json({ error: "Query too short" }, { status: 400 });
  }

  let allCourse = await cache.get("allCourse", []);

  if (!allCourse || allCourse.length === 0) {
    allCourse = await prisma.course.findMany();
    console.log("all the courses",allCourse)
    await cache.set("allCourse", [], allCourse, 300); // 5 minutes cache
  }

  const results =await fuzzySearch(allCourse, searchQuery);

  console.log("the course result", results)
  return NextResponse.json(results);
}
