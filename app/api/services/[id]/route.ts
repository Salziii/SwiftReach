import { NextRequest, NextResponse } from "next/server";
import db from "@/prisma/database";

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

  const service = await db.service.findUnique({
   where: { id: id },
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

  if (!service)
   return NextResponse.json(
    { error: `Service with ID ${params.id} does not exist!` },
    { status: 400 }
   );

  return NextResponse.json(service, { status: 200 });
 } catch (err) {
  console.log(err);
  return NextResponse.json(
   { error: "Internal Server Error - We are working on it!" },
   { status: 500 }
  );
 }
}
