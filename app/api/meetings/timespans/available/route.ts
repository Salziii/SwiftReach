import { isAvailable } from "@/lib/google/calendar";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
 try {
  const date = request.nextUrl.searchParams.get("date");
  if (!date)
   return NextResponse.json({ error: "Specify a date!" }, { status: 400 });
  return NextResponse.json(
   { available: await isAvailable(new Date(date)) },
   { status: 200 }
  );
 } catch (err) {
  console.log(err);
  return NextResponse.json(
   { error: "Internal Server Error - We are working on it!" },
   { status: 500 }
  );
 }
}
