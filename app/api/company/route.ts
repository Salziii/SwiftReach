import { Sender, sendMail } from "@/lib/mailer";
import { emailValid, getEmailDomain, isCustomEmail } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import jwt from "jsonwebtoken";
import { format } from "../(utils)/formatter";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
 typescript: true,
 apiVersion: "2023-10-16",
});

export async function GET(request: NextRequest) {
 try {
  let depth = Number(request.nextUrl.searchParams.get("depth"))

  let id = request.nextUrl.searchParams.get("id");
  const token: string | undefined = request.cookies.get("token")?.value

  if (!id) {
   if (!token)
    return NextResponse.json({ error: "Provide A Company ID Or Log In!" }, { status: 400 })
   const data: any = jwt.verify(token!, process.env.JWT_SECRET_KEY!)
   const account = await Account.findByPk(data.id)
   id = account?.getDataValue("company")
  }

  const company = await Company.findByPk(id!)

  if (!company)
   return NextResponse.json(
    { error: `Company with ID ${id} does not exist!` },
    { status: 400 }
   );

  return NextResponse.json(await format(company, depth), { status: 200 });

 } catch (err) {
  console.log(err)
  return NextResponse.json({ error: "Contact an Admin!" }, { status: 500 })
 }
}

export async function POST(request: NextRequest) {
 try {
  const { name, contactEmail } = await request.json();

  if (!name) return Response.json({ error: "Provide A Name!" }, { status: 400 });
  if (!contactEmail)
   return Response.json({ error: "Provide A Contact Email!" }, { status: 400 });
  if (!emailValid(contactEmail))
   return Response.json(
    { error: "Provide A Valid Contact Email!" },
    { status: 400 }
   );

  if (isCustomEmail(contactEmail)) {
   const emailDomain = getEmailDomain(contactEmail);

   if (emailDomain === "swiftreach.de") {
    return NextResponse.json({ error: "Please Use The Employee Login!" }, { status: 400 });
   }

   let company = await Company.findOne({
    where: { emailDomain: emailDomain },
   });

   if (!company) {
    const customer = await stripe.customers.create({
     name: name,
     email: contactEmail,
    });

    company = await Company.create({
     name: name,
     emailDomain: emailDomain,
     contactEmail: contactEmail,
     stripeCustomerId: customer.id,
    });

    return Response.json(
     { company: company },
     {
      status: 201,
     }
    );
   }

   await Company.update(
    {
     name: name,
     contactEmail: contactEmail,
    },
    { where: { emailDomain: emailDomain } }
   );

   await stripe.customers.update(company.getDataValue("stripeCustomerId"), {
    name: name,
    email: contactEmail,
   });

   return Response.json(
    {
     company: company,
    },
    {
     status: 200,
    }
   );
  }

  let company = await Company.findOne({
   where: { contactEmail: contactEmail },
  });

  if (!company) {
   const customer = await stripe.customers.create({
    name: name,
    email: contactEmail,
   });

   company = await Company.create({
    name: name,
    contactEmail: contactEmail,
    stripeCustomerId: customer.id,
   });

   return Response.json(
    {
     company: company,
    },
    { status: 201 }
   );
  }

  await Company.update(
   { name: name },
   { where: { contactEmail: contactEmail } }
  );

  await stripe.customers.update(company?.getDataValue("stripeCustomerId"), {
   name: name,
  });

  return Response.json(
   {
    company: company,
   },
   { status: 200 }
  );
 } catch (err) {
  return NextResponse.json({ error: "Internal Server Error!" }, { status: 500 })
 }
}
