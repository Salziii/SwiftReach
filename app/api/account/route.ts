import { Sender, sendMail } from "@/lib/mailer";
import { emailValid, getEmailDomain, isCustomEmail } from "@/lib/utils";
import { Account, Company } from "@/sql/models";
import { NextRequest, NextResponse } from "next/server";
import { Op } from "sequelize";
import { randomBytes } from "crypto";
import { sendVerificationMail } from "../(mailer)/mails";
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

    const account = await Account.findByPk(id!)

    if (!account)
      return NextResponse.json(
        { error: `Account with ID ${id} does not exist!` },
        { status: 400 }
      );

    return NextResponse.json(await format(account, depth), { status: 200 });

  } catch (err) {
    console.log(err)
    return NextResponse.json({ error: "Contact an Admin!" }, { status: 500 })
  }
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

  if (account) {
    const response = NextResponse.json({ account: account }, { status: 200 });
    response.cookies.set("token", jwt.sign(account.toJSON(), process.env.JWT_SECRET_KEY!, { expiresIn: "7d" }), { httpOnly: true })
    return response
  }

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
    name: isRootAccount ? company.dataValues.name : name,
    email: email,
    employee: false,
    company: company.dataValues.id,
    verificationCode: verificationCode,
  });

  sendVerificationMail(email, verificationCode);

  const response = NextResponse.json({ account: account }, { status: 201 });
  response.cookies.set("token", jwt.sign(account.toJSON(), process.env.JWT_SECRET_KEY!, { expiresIn: "7d" }), { httpOnly: true })
  return response

}
