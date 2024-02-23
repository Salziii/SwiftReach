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

  const painpoint = await db.painpoint.findUnique({
   where: { id: id },
   select: { id: true, label: true, services: true, description: true, image: true },
  });

  if (!painpoint)
   return NextResponse.json(
    { error: `Painpoint with ID ${params.id} does not exist!` },
    { status: 400 }
   );

  return NextResponse.json(painpoint, { status: 200 });
 } catch (err) {
  console.log(err);
  return NextResponse.json(
   { error: "Internal Server Error - We are working on it!" },
   { status: 500 }
  );
 }
}
