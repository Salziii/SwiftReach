import { setAppointment } from "@/lib/google/calendar"
import { Company } from "@/sql/models";
import axios, { AxiosError } from "axios"
import { NextRequest, NextResponse } from "next/server"
import { sendMeetingMail } from "../(mailer)/mails";

export async function POST(request: NextRequest) {

  try {

    const res = await request.json();
    const accountId = res.accountId;

    const sDate = request.nextUrl.searchParams.get("date") // 2024-02-02T08:30:00.000Z

    if (!accountId) return NextResponse.json({ error: "Provide a Account ID!" }, { status: 400 })
    if (!sDate) return NextResponse.json({ error: "Specify a date!" }, { status: 400 })

    const date = new Date(sDate)

    if (!(await axios.get("http://localhost:3000/api/appointment/timespans/available?date=" + date.toISOString())).data.available)
      return NextResponse.json({ error: "Unavailable Timespan!" }, { status: 400 })

    const account = (await axios.get("http://localhost:3000/api/account?accountId=" + accountId)).data

    const company = await Company.findOne({ where: { id: account.company } })

    const endDate = new Date(date)
    endDate.setMinutes(endDate.getMinutes() + 30)

    const appointment = await setAppointment(date, endDate, company!.get("name") + "", "Discovery Call", [account.email])

    sendMeetingMail(account.email, appointment.data.hangoutLink!)

    return NextResponse.json(appointment, { status: 200 })

  } catch (err) {
    if (err instanceof AxiosError) return NextResponse.json({ error: err.response?.data.error }, { status: 400 })
    if (err instanceof SyntaxError) return NextResponse.json({ error: "Provide a Body!" }, { status: 400 })
    console.log(err)
    return NextResponse.json({ error: "Contact an Admin!" }, { status: 500 })
  }

}
