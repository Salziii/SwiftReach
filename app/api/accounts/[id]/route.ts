import { NextRequest, NextResponse } from "next/server";
import db from "@/prisma/database";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
 try {
  
  const id = Number(params.id)

  if (!id) return NextResponse.json(
   { error: `Param '${params.id}' is not a number!` },
   { status: 400 }
  );

  const account = await db.account.findUnique({
   where: { id: id },
   select: {
    id: true,
    role: true,
    name: true,
    email: true,
    company: true
   },
  });

  if (!account)
   return NextResponse.json(
    { error: `Account with ID ${params.id} does not exist!` },
    { status: 400 }
   );

  return NextResponse.json(account, { status: 200 });
 } catch (err) {
  console.log(err);
  return NextResponse.json(
   { error: "Internal Server Error - We are working on it!" },
   { status: 500 }
  );
 }
}
