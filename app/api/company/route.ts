import { Sender, sendMail } from "@/lib/mailer";
import { emailValid, getEmailDomain, isCustomEmail } from "@/lib/utils";
import { Account, Company } from "@/sql/models";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import jwt from "jsonwebtoken";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
 typescript: true,
 apiVersion: "2023-10-16",
});

const infoEmailSender: Sender = {
 email: "marketing@swiftreach.de",
 password: "BFs32t%vdg^@zP9vQYU2",
 name: "SwiftReach",
};

export async function GET(request: NextRequest) {
 try {
  let company; 

  const id = request.nextUrl.searchParams.get("id");
  if (id) company = await Company.findByPk(id)

  const name = request.nextUrl.searchParams.get("name");
  if (name && !company) company = await Company.findOne({ where: { name: name } })

  const token: string | undefined = request.cookies.get("token")?.value
  if (token && !company && !id && !name) {
   const data:any = jwt.verify(token!, process.env.JWT_SECRET_KEY!)
   const account = await Account.findByPk(data.id)
   const id = account?.getDataValue("company")

   if (!id) return NextResponse.json(
    { error: "Not assigned to a company!" },
    { status: 401 }
   );

   company = await Company.findByPk(id)

  }

  if (!company) return NextResponse.json(
   { error: `Company does not exist!` },
   { status: 400 }
  );

  return NextResponse.json({
   id: company.getDataValue("id"),
   name: company.getDataValue("name"),
   contactEmail: company.getDataValue("contactEmail")
  }, { status: 200 });

 } catch (error: any) {
  return Response.json({ errors: error.message }, { status: 500 });
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
