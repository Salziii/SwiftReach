import db from "@/prisma/database";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/prisma/database"

export async function GET(
 request: NextRequest,
 { params }: { params: { token: string } }
) {
 try {
  const token = params.token;
  const data: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);
  await prisma.sentEmail.update({ where: { id: data.id }, data: { opened: true, openingTime: new Date() } })
  return new NextResponse()
 } catch (err) {
  console.log(err);
  return NextResponse.json(
   { error: "Internal Server Error - We are working on it!" },
   { status: 500 }
  );
 }
}
