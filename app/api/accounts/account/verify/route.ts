import db from "@/prisma/database";
import { NextRequest, NextResponse } from "next/server";

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
 });

 if (!account)
  return NextResponse.json(
   {
    error: `There Is No Account With Email '${email}' And Verification Code '${verificationCode}'!`,
   },
   { status: 404 }
  );

 await db.account.update({
  where: { email: email, verificationCode: verificationCode },
  data: {
   verificationCode: null,
   password: password,
  },
 });

 return new NextResponse();
}
