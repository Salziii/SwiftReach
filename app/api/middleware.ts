import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from "jsonwebtoken";
import db from "@/prisma/database"

export async function middleware(request: NextRequest) {
 if (request.nextUrl.pathname.startsWith('/admin')) {
  const token: string | undefined = request.cookies.get("token")?.value;
  if (!token) return NextResponse.json({ error: "Permission denied!" }, { status: 403 })
  const data: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);
  const account = await db.account.findUnique({ where: { id: data.id } });
  if (account?.role === "USER") return NextResponse.json({ error: "Permission denied!" }, { status: 403 })
 }
}