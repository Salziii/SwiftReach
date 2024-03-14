import { sendMail } from "@/lib/mailer";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
 try {

  const { message, sender, recipients } = await request.json()
  const { label, content } = message
  const { email, password, name } = sender

  await sendMail(
   {
    label: label,
    text: content
   },
   {
    email: email,
    password: password,
    name: name ?? undefined
   },
   recipients
  );

  return new NextResponse()

 } catch (err) {
  console.log(err);
  if (err instanceof AxiosError)
   return NextResponse.json(
    { error: err.response?.data.error },
    { status: 400 }
   );
  return NextResponse.json({ error: "Contact an Admin!" }, { status: 500 });
 }
}
