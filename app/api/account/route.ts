import { emailValid, getEmailDomain, isCustomEmail } from "@/lib/utils";
import { Account, Prisma, PrismaClient } from "@prisma/client";
import { randomBytes } from "crypto";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { Op } from "sequelize";
import { sendVerificationMail } from "../(utils)/mails";
import db from "@/prisma/database";

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
    company: true,
    meetings: true,
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

export async function POST(request: NextRequest) {
 const email: string = await request.json().then((json) => json.email);

 if (!email)
  return NextResponse.json({ error: "Provide A Email!" }, { status: 400 });

 if (!emailValid(email))
  return NextResponse.json(
   { error: "Provide A Valid Email!" },
   { status: 400 }
  );

 const account = await db.account.findFirst({
  where: { email: email },
  select: {
   id: true,
   role: true,
   name: true,
   email: true,
   company: true,
   meetings: true,
   serviceSales: true,
   subscriptionSales: true
  },
 });

 if (account) {
  const response = NextResponse.json(account, { status: 200 });

  response.cookies.set(
   "token",
   jwt.sign(account, process.env.JWT_SECRET_KEY!, { expiresIn: "7d" }),
   { httpOnly: true }
  );

  return response;
 }

 const emailDomain = isCustomEmail(email) ? getEmailDomain(email) : "";

 if (emailDomain === "swiftreach.de") {
  return NextResponse.json({ employee: true });
 }

 let company = await db.company.findFirst({
  where: { OR: [{ emailDomain: emailDomain }, { contactEmail: email }] },
 });

 if (!company) {
  return NextResponse.json(
   { error: "This company is not registered!" },
   { status: 400 }
  );
 }

 const verificationCode = randomBytes(8).toString("hex");
 const name = email.replace("@" + getEmailDomain(email), "");

 const newAccount = await db.account.create({
  data: {
   name: name,
   email: email,
   role: "USER",
   company: {
    connect: { id: company.id },
   },
   verificationCode: verificationCode,
  },
 });

 sendVerificationMail(email, verificationCode);

 const response = NextResponse.json(account, { status: 201 });

 response.cookies.set(
  "token",
  jwt.sign(newAccount, process.env.JWT_SECRET_KEY!, { expiresIn: "7d" }),
  { httpOnly: true }
 );
 return response;
}
