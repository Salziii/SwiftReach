import { generateTimespans, overlaps } from "@/lib/dateUtils";
import { getApointments } from "@/lib/google/calendar";
import { NextRequest, NextResponse } from "next/server";

const startTime = "13:30"
const endTime = "17:45"
const duration = 20 * 60 * 1000
const pauseDuration = 15 * 60 * 1000

export async function GET(request: NextRequest) {

 try {
  const date = request.nextUrl.searchParams.get("date") // 2024-02-01

  if (!date) return NextResponse.json({ error: "Specify a date!" }, { status: 400 })

  const day = new Date(date)

  const start = new Date(day.getFullYear(), day.getMonth(), day.getDate(), Number(startTime.split(":")[0]), Number(startTime.split(":")[1]))
  const end = new Date(day.getFullYear(), day.getMonth(), day.getDate(), Number(endTime.split(":")[0]), Number(endTime.split(":")[1]))
  
  const timespans = generateTimespans(start, end, duration, pauseDuration)
  const appointments = await getApointments(start, end)

  return NextResponse.json(timespans.filter((timespan) => !overlaps(timespan, appointments)))

 } catch (err) {
  if (err instanceof RangeError) return NextResponse.json({ error: err.message }, { status: 400 })
  return NextResponse.json({ error: err }, { status: 500 })
 }

}