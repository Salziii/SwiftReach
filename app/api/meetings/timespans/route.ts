import { getAvailableTimespans } from "@/lib/google/calendar";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
 try {
  const date = request.nextUrl.searchParams.get("date"); // 2024-02-01
  if (!date)
   return NextResponse.json({ error: "Specify a date!" }, { status: 400 });
  return NextResponse.json(await getAvailableTimespans(new Date(date)));
 } catch (err) {
  console.error(err)
  if (err instanceof RangeError)
   return NextResponse.json({ error: err.message }, { status: 400 });
  return NextResponse.json(err, { status: 500 });
 }
}
