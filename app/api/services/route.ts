import { NextResponse } from "next/server";
import db from "@/prisma/database";

export async function GET() {
 try {
  const services = await db.service.findMany({
   select: {
    id: true,
    label: true,
    description: true,
    saturated: true,
    image: true,
    price: true,
    performanceFee: true,
    painpoints: true,
   },
  });

  return NextResponse.json(services, { status: 200 });
 } catch (err) {
  console.log(err);
  return NextResponse.json(
   { error: "Internal Server Error - We are working on it!" },
   { status: 500 }
  );
 }
}
