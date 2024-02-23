import db from "@/prisma/database";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
 try {
  const token: string | undefined = request.cookies.get("token")?.value;
  if (!token) return NextResponse.json({ error: "Log In!" }, { status: 403 });
  const account: any = jwt.verify(token!, process.env.JWT_SECRET_KEY!);

  const meetings = await db.meeting.findMany({
   select: {
    id: true,
    link: true,
    label: true,
    end: true,
    start: true,
    accounts: true,
   },
   where: { accounts: { some: { id: account.id } } },
  });

  return NextResponse.json(meetings, { status: 200 });
 } catch (err) {
  console.log(err);
  return NextResponse.json(
   { error: "Internal Server Error - We are working on it!" },
   { status: 500 }
  );
 }
}

// import { sendMeetingMail } from "../(utils)/mails";
//
// export async function POST(request: NextRequest) {
//  try {
//   const token: string | undefined = request.cookies.get("token")?.value;
//   if (!token) return NextResponse.json({ error: "Log In!" }, { status: 403 });
//   const data: any = jwt.verify(token!, process.env.JWT_SECRET_KEY!);

//   const account = await db.account.findUnique({ where: { id: data.id } });

//   if (!account) return NextResponse.json({ error: "Log In!" }, { status: 403 });

//   const company = await db.company.findUnique({
//    where: { id: account.companyId! },
//   });

//   const sDate = request.nextUrl.searchParams.get("date"); // 2024-02-02T08:30:00.000Z

//   if (!sDate)
//    return NextResponse.json({ error: "Specify a date!" }, { status: 400 });

//   const date = new Date(sDate);

//   if (!(await isAvailable(date)))
//    return NextResponse.json(
//     { error: "Unavailable Timespan!" },
//     { status: 400 }
//    );

//   const endDate = new Date(date);
//   endDate.setMinutes(endDate.getMinutes() + 30);

//   const appointment = await setAppointment(
//    date,
//    endDate,
//    company?.name + " - Discovery Call",
//    "",
//    [account.email]
//   );

//   await db.meeting.create({
//    data: {
//     label: "Discovery Call",
//     link: appointment.data.hangoutLink,
//     start: date,
//     end: endDate,
//     accounts: { connect: { id: account.id } },
//    },
//   });

//   sendMeetingMail(account.email, appointment.data.hangoutLink!);

//   return new NextResponse();
//  } catch (err) {
//   console.log(err);
//   if (err instanceof AxiosError)
//    return NextResponse.json(
//     { error: err.response?.data.error },
//     { status: 400 }
//    );
//   return NextResponse.json({ error: "Contact an Admin!" }, { status: 500 });
//  }
// }
