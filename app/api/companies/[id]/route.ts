import { NextRequest, NextResponse } from "next/server";
import db from "@/prisma/database";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
 try {
  
  const id = Number(params.id)

  if (!id) return NextResponse.json(
   { error: `Param '${params.id}' is not a number!` },
   { status: 400 }
  );

  const company = await db.company.findUnique({
   where: { id: id },
   select: {
    id: true,
    name: true,
    contactEmail: true,
    emailDomain: true,
    members: true,
   },
  });

  if (!company)
   return NextResponse.json(
    { error: `Company with ID ${id} does not exist!` },
    { status: 400 }
   );

  return NextResponse.json(company, { status: 200 });
 } catch (err) {
  console.log(err);
  return NextResponse.json(
   { error: "Internal Server Error - We are working on it!" },
   { status: 500 }
  );
 }
}
