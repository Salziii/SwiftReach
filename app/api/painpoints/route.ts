import { NextResponse } from "next/server";
import db from "@/prisma/database";

export async function GET() {
 try {
  const painpoints = await db.painpoint.findMany({
   select: { id: true, label: true, services: true, description: true, image: true },
  });

  return NextResponse.json(painpoints, { status: 200 });
 } catch (err) {
  console.log(err);
  return NextResponse.json(
   { error: "Internal Server Error - We are working on it!" },
   { status: 500 }
  );
 }
}
