import db from "@/prisma/database";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function PUT(request: NextRequest) {
 const { email, password } = await request.json();

 if (!email)
  return NextResponse.json({ error: "Provide A Email!" }, { status: 400 });

 let account = await db.account.findUnique({
  where: { email: email },
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
  }
 })

 if (!account)
  return NextResponse.json(
   {
    error: `Account Does Not Exist!`,
   },
   { status: 404 }
  );

 if (account.role !== "EMPLOYEE")
  return NextResponse.json(
   {
    error: `Account does not belong to any employee!`,
   },
   { status: 403 }
  );

 if (!password)
  return NextResponse.json(
   { error: "Provide A Password (hashed)!" },
   { status: 400 }
  );

 account = await db.account.findFirst({
  where: { AND: { email: email, password: password } },
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

 if (!account)
  return NextResponse.json(
   {
    error: `Password wrong!`
   },
   { status: 403 }
  );

 const response = NextResponse.json(account, { status: 200 });

 response.cookies.set(
  "token",
  jwt.sign(account, process.env.JWT_SECRET_KEY!),
  { httpOnly: true }
 );

 response.cookies.set(
  "companyToken",
  jwt.sign(account.company!, process.env.JWT_SECRET_KEY!),
  { httpOnly: true }
 );

 return response;

}
