import { Sender, sendMail } from "@/lib/mailer";
import { emailValid, getEmailDomain, isCustomEmail } from "@/lib/utils";
import { Company } from "@/sql/models";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

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
  return Response.json(
   await Company.findOne({
    where: { id: request.nextUrl.searchParams.get("id") },
   })
  );
 } catch (error: any) {
  return Response.json({ errors: error.errors }, { status: 400 });
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
