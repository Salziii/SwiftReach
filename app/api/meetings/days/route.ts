import { NextRequest, NextResponse } from "next/server";
import { isAvailableDay, getAllDays } from "@/lib/dateUtils";

export async function GET(request: NextRequest) {
 try {
  const date = request.nextUrl.searchParams.get("date") // 2024-02
  if (!date) return NextResponse.json({ error: "Specify a date!" }, { status: 400 })
  const month = new Date(date)
  return NextResponse.json(getAllDays(month).map((day:Date) => ({ date: day.toISOString(), available: isAvailableDay(day) })), { status:200 })
 } catch (err) {
  if (err instanceof RangeError) return NextResponse.json({ error: err.message }, { status: 400 })
  return NextResponse.json({ error: err }, { status: 500 })
 }
}