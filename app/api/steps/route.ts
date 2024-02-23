import { NextRequest, NextResponse } from "next/server";
import db from "@/prisma/database";

export async function GET() {
 try {
  const steps = await db.step.findMany({
   select: {
    id: true,
    label: true,
    description: true,
    videoId: true,
   },
  });

  return NextResponse.json(steps, { status: 200 });
 } catch (err) {
  console.log(err);
  return NextResponse.json(
   { error: "Internal Server Error - We are working on it!" },
   { status: 500 }
  );
 }
}