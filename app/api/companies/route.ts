import { emailValid, getEmailDomain, isCustomEmail } from "@/lib/utils";
import db from "@/prisma/database";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import jwt from "jsonwebtoken";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
 typescript: true,
 apiVersion: "2023-10-16",
});

export async function GET() {
 try {
  const companys = await db.company.findMany({
   select: {
    id: true,
    name: true,
    contactEmail: true,
    emailDomain: true,
    members: true,
   },
  });

  return NextResponse.json(companys, { status: 200 });
 } catch (err) {
  console.log(err);
  return NextResponse.json(
   { error: "Internal Server Error - We are working on it!" },
   { status: 500 }
  );
 }
}

export async function POST(request: NextRequest) {
 try {
  const { name, contactEmail } = await request.json();

  if (!name)
   return NextResponse.json({ error: "Provide A Name!" }, { status: 400 });
  if (!contactEmail)
   return NextResponse.json(
    { error: "Provide A Contact Email!" },
    { status: 400 }
   );
  if (!emailValid(contactEmail))
   return NextResponse.json(
    { error: "Provide A Valid Contact Email!" },
    { status: 400 }
   );

  if (
   (await db.account.findUnique({ where: { email: contactEmail } }))?.password
  )
   return NextResponse.json(
    { error: "Company Is Verified! Log In via Login Page!" },
    { status: 403 }
   );

  if (isCustomEmail(contactEmail)) {
   const emailDomain = getEmailDomain(contactEmail);

   if (emailDomain === "swiftreach.de") {
    return NextResponse.json(
     { error: "Please Use The Employee Login!" },
     { status: 400 }
    );
   }

   let company = await db.company.findFirst({
    select: {
     id: true,
     name: true,
     contactEmail: true,
     emailDomain: true,
     members: true,
     steps: true,
     stripeId: true,
    },
    where: { emailDomain: emailDomain },
   });

   if (!company) {
    const customer = await stripe.customers.create({
     name: name,
     email: contactEmail,
    });

    company = await db.company.create({
     select: {
      id: true,
      name: true,
      contactEmail: true,
      emailDomain: true,
      members: true,
      steps: true,
      stripeId: true,
     },
     data: {
      name: name,
      emailDomain: emailDomain,
      contactEmail: contactEmail,
      stripeId: customer.id,
      steps: {
       createMany: {
        data: (
         await db.step.findMany()
        ).map((step) => ({ stepId: step.id, status: "PENDING" })),
       },
      },
     },
    });

    const response = NextResponse.json(company, {
     status: 201,
    });

    response.cookies.set(
     "companyToken",
     jwt.sign(company, process.env.JWT_SECRET_KEY!),
     { httpOnly: true }
    );

    return response;
   }

   await db.company.update({
    data: {
     name: name,
     contactEmail: contactEmail,
    },
    where: { emailDomain: emailDomain },
   });

   await stripe.customers.update(company.stripeId, {
    name: name,
    email: contactEmail,
   });

   const response = NextResponse.json(company, {
    status: 200,
   });

   response.cookies.set(
    "companyToken",
    jwt.sign(company, process.env.JWT_SECRET_KEY!),
    { httpOnly: true }
   );

   return response;
  }

  let company = await db.company.findFirst({
   select: {
    id: true,
    name: true,
    contactEmail: true,
    emailDomain: true,
    members: true,
    steps: true,
    stripeId: true,
   },
   where: { contactEmail: contactEmail },
  });

  if (!company) {
   const customer = await stripe.customers.create({
    name: name,
    email: contactEmail,
   });

   company = await db.company.create({
    select: {
     id: true,
     name: true,
     contactEmail: true,
     emailDomain: true,
     members: true,
     steps: true,
     stripeId: true,
    },
    data: {
     name: name,
     contactEmail: contactEmail,
     stripeId: customer.id,
     steps: {
      createMany: {
       data: (
        await db.step.findMany()
       ).map((step) => ({ stepId: step.id, status: "PENDING" })),
      },
     },
    },
   });

   const response = NextResponse.json(company, {
    status: 201,
   });

   response.cookies.set(
    "companyToken",
    jwt.sign(company, process.env.JWT_SECRET_KEY!),
    { httpOnly: true }
   );

   return response;
  }

  await db.company.update({
   data: { name: name },
   where: { contactEmail: contactEmail },
  });

  await stripe.customers.update(company.stripeId, {
   name: name,
  });

  const response = NextResponse.json(company, {
   status: 200,
  });

  response.cookies.set(
   "companyToken",
   jwt.sign(company, process.env.JWT_SECRET_KEY!),
   { httpOnly: true }
  );

  return response;
 } catch (err) {
  console.error(err);

  if (err instanceof Error)
   return NextResponse.json({ error: err.message }, { status: 500 });

  return NextResponse.json(
   { error: "Internal Server Error - We are working on it!" },
   { status: 500 }
  );
 }
}
