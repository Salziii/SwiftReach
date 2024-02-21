import { setAppointment } from "@/lib/google/calendar";
import { Account, Company, Meeting, meetingAccounts } from "@/sql/models";
import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
import { sendMeetingMail } from "../(mailer)/mails";
import jwt from "jsonwebtoken";
import { format } from "../(utils)/formatter";

export async function GET(request: NextRequest) {

  try {

    let depth = Number(request.nextUrl.searchParams.get("depth"))

    let id = request.nextUrl.searchParams.get("id");
    const token: string | undefined = request.cookies.get("token")?.value

    if (!id) {
      if (!token)
        return NextResponse.json({ error: "Provide A Account ID Or Log In!" }, { status: 400 })
      const data: any = jwt.verify(token!, process.env.JWT_SECRET_KEY!)
      id = data.id
    }

    const appointment = await Meeting.findByPk(id!)

    if (!appointment)
      return NextResponse.json(
        { error: `Appointment with ID ${id} does not exist!` },
        { status: 400 }
      );

    return NextResponse.json(await format(appointment, depth), { status: 200 });

  } catch (err) {
    console.log(err)
    return NextResponse.json({ error: "Contact an Admin!" }, { status: 500 })
  }

}

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

    const account = await Account.findByPk(accountId)

    if (!account) return NextResponse.json({ error: "Account does not exist!" }, { status: 400 })

    const company = await Company.findOne({ where: { id: account.getDataValue("company") } })

    const endDate = new Date(date)
    endDate.setMinutes(endDate.getMinutes() + 30)

    const appointment = await setAppointment(date, endDate, company!.get("name") + " - Discovery Call", "", [account.getDataValue("email")])

    const meeting = await Meeting.create({ label: "Discovery Call", link: appointment.data.hangoutLink, start: date, end: endDate })
    meetingAccounts.create({ meeting: meeting.getDataValue("id"), account: account.getDataValue("id") })

    sendMeetingMail(account.getDataValue("email"), appointment.data.hangoutLink!)

    return NextResponse.json(appointment, { status: 200 })

  } catch (err) {
    if (err instanceof AxiosError) return NextResponse.json({ error: err.response?.data.error }, { status: 400 })
    if (err instanceof SyntaxError) return NextResponse.json({ error: "Provide a Body!" }, { status: 400 })
    console.log(err)
    return NextResponse.json({ error: "Contact an Admin!" }, { status: 500 })
  }

}
