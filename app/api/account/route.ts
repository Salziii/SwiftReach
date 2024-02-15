import { Sender, sendMail } from "@/lib/mailer";
import { emailValid, getEmailDomain, isCustomEmail } from "@/lib/utils";
import { Account, Company } from "@/sql/models";
import { NextRequest, NextResponse } from "next/server";
import { Op } from "sequelize";
import { randomBytes } from "crypto";
import { sendVerificationMail } from "../(mailer)/mails";

export async function GET(request: NextRequest) {
 const accountId = request.nextUrl.searchParams.get("accountId");

 if (!accountId)
  return NextResponse.json({ error: "Provide A Account ID!" }, { status: 400 });

 if (!(await Account.findByPk(accountId)))
  return NextResponse.json(
   { error: `Account with ID ${accountId} does not exist!` },
   { status: 400 }
  );

 return Response.json(await Account.findByPk(accountId));
}

export async function POST(request: NextRequest) {
 const res = await request.json();
 const email: string = res.email;

 if (!email)
  return NextResponse.json({ error: "Provide A Email!" }, { status: 400 });
 if (!emailValid(email))
  return NextResponse.json(
   { error: "Provide A Valid Email!" },
   { status: 400 }
  );

 const name = email.replace("@" + getEmailDomain(email), "");

 let account = await Account.findOne({ where: { email: email } });

 if (account) return NextResponse.json({ account: account }, { status: 200 });

 const emailDomain = isCustomEmail(email) ? getEmailDomain(email) : "";

 if (emailDomain === "swiftreach.de") {
  return NextResponse.json({ employee: true });
 }

 let company = await Company.findOne({
  where: { [Op.or]: [{ emailDomain: emailDomain }, { contactEmail: email }] },
 });
 const isRootAccount: boolean = !!(await Company.findOne({
  where: { contactEmail: email },
 }));

 if (!company) {
  return NextResponse.json(
   { error: "Register your Company, to get started!" },
   { status: 400 }
  );
 }

 const verificationCode = randomBytes(8).toString("hex");

 account = await Account.create({
  name: isRootAccount ? "$root" : name,
  email: email,
  employee: false,
  company: company.dataValues.id,
  verificationCode: verificationCode,
 });

 sendVerificationMail(email, verificationCode);

 return NextResponse.json({ account: account }, { status: 201 });
}
