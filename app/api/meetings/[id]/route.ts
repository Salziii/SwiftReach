import db from "@/prisma/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
 request: NextRequest,
 { params }: { params: { id: string } }
) {
 try {
  const id = Number(params.id);

  if (!id)
   return NextResponse.json(
    { error: `Param '${params.id}' is not a number!` },
    { status: 400 }
   );

  const meeting = await db.meeting.findUnique({
   where: { id: Number(params.id) },
   select: {
    id: true,
    link: true,
    label: true,
    end: true,
    start: true,
    members: true,
   },
  });

  if (!meeting)
   return NextResponse.json(
    { error: `Meeting with ID ${params.id} does not exist!` },
    { status: 400 }
   );

  return NextResponse.json(meeting, { status: 200 });
 } catch (err) {
  console.log(err);
  return NextResponse.json(
   { error: "Internal Server Error - We are working on it!" },
   { status: 500 }
  );
 }
}
