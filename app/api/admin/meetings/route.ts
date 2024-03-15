import db from "@/prisma/database";
import { NextResponse } from "next/server";

export async function GET() {
 try {
  const meetings = await db.meeting.findMany({
   select: {
    id: true,
    link: true,
    label: true,
    end: true,
    start: true,
    members: true,
   },
  });

  return NextResponse.json(meetings, { status: 200 });
 } catch (err) {
  console.log(err);
  return NextResponse.json(
   { error: "Internal Server Error - We are working on it!" },
   { status: 500 }
  );
 }
}