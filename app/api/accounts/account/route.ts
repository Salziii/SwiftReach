import db from "@/prisma/database";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
 try {
  const token: string | undefined = request.cookies.get("token")?.value;

  if (!token) return NextResponse.json({ error: "Log In!" }, { status: 403 });

  const data: any = jwt.verify(token!, process.env.JWT_SECRET_KEY!);

  const account = await db.account.findUnique({
   where: { id: data.id },
   select: {
    id: true,
    role: true,
    name: true,
    email: true,
    company: {
     include: {
      steps: { include: { step: true } },
      painpoints: true,
      members: true,
     },
    },
    meetings: { include: { members: true } },
    serviceSales: true,
    subscriptionSales: true,
   },
  });

  return NextResponse.json(account, { status: 200 });
 } catch (err) {
  console.log(err);
  return NextResponse.json(
   { error: "Internal Server Error - We are working on it!" },
   { status: 500 }
  );
 }
}
