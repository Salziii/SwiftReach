import { NextRequest, NextResponse } from "next/server";
import { isSameMinute } from "@/lib/dateUtils";
import axios from "axios";

export async function GET(request: NextRequest) {
 try {
  const sDate = request.nextUrl.searchParams.get("date")
  if (!sDate) return NextResponse.json({ error: "Specify a date!" }, { status: 400 })
  const date = new Date(sDate)
  const timespans:any[] = (await axios.get("http://localhost:3000/api/appointment/timespans?date=" + date.toISOString())).data
  return NextResponse.json({ available: !!timespans.filter((timespan:any) => isSameMinute(date, new Date(timespan.start)))[0] }, { status:200 })
 } catch (err) {
  if (err instanceof RangeError) return NextResponse.json({ error: err.message }, { status: 400 })
  console.error(err)
  return NextResponse.json({ error: err }, { status: 500 })
 }
}