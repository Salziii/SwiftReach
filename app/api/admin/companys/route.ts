import db from "@/prisma/database";
import { NextResponse } from "next/server";

export async function GET() {
 try {
  return NextResponse.json(await db.company.findMany(), { status: 200 });
 } catch (err) {
  console.log(err);
  return NextResponse.json(
   { error: "Internal Server Error - We are working on it!" },
   { status: 500 }
  );
 }
}
