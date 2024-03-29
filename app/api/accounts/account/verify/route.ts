import db from "@/prisma/database";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function PUT(request: NextRequest) {
 const { email, verificationCode, password } = await request.json();

 if (!email)
  return NextResponse.json({ error: "Provide A Email!" }, { status: 400 });

 if (!verificationCode)
  return NextResponse.json(
   { error: "Provide A Verification Code!" },
   { status: 400 }
  );

 let account = await db.account.findFirst({
  where: { email: email, verificationCode: null },
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

 if (account)
  return NextResponse.json(
   {
    error: "Already verified!",
   },
   { status: 409 }
  );

 if (!password)
  return NextResponse.json(
   { error: "Provide A Password (hashed)!" },
   { status: 400 }
  );

 account = await db.account.findFirst({
  where: { AND: { email: email, verificationCode: verificationCode } },
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
 });

 if (!account)
  return NextResponse.json(
   {
    error: `There Is No Account With Email '${email}' And Verification Code '${verificationCode}'!`,
   },
   { status: 404 }
  );

 account = await db.account.update({
  where: { email: email, verificationCode: verificationCode },
  data: {
   verificationCode: null,
   password: password,
  },
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
 });

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