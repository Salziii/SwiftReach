import db from "@/prisma/database";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
 try {
  const token: string | undefined = request.cookies.get("companyToken")?.value;

  if (!token) return NextResponse.json({ error: "Log In!" }, { status: 403 });

  const data: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);

  const company = await db.company.findUnique({
   select: {
    id: true,
    name: true,
    contactEmail: true,
    emailDomain: true,
    stripeId: true,
    members: true,
    steps: true,
    painpoints: true,
   },
   where: { id: data.id },
  });

  return NextResponse.json(company, { status: 200 });
 } catch (err) {
  console.log(err);
  return NextResponse.json(
   { error: "Internal Server Error - We are working on it!" },
   { status: 500 }
  );
 }
}
