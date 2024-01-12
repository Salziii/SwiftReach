import { Sender, sendMail } from "@/lib/mailer";
import { emailValid, getEmailDomain, isCustomEmail } from "@/lib/utils";
import { Company } from "@/sql/models";
import { NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY!,
  {
    typescript: true,
    apiVersion: "2023-10-16",
  }
);

const infoEmailSender: Sender = {
  email: "marketing@swiftreach.de",
  password: "BFs32t%vdg^@zP9vQYU2",
  name: "SwiftReach",
}

export async function GET(request: NextRequest) {
  try {
    return Response.json(await Company.findOne({ where: { id: request.nextUrl.searchParams.get("id") } }));
  } catch (error: any) {
    return Response.json({ errors: error.errors }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {

  const { name, contactEmail } = await request.json()

  if (!emailValid(contactEmail)) { return Response.json({ error: "Email is not valid!" }); }

  if (isCustomEmail(contactEmail)) {
    // Email is custom

    const emailDomain = getEmailDomain(contactEmail)

    if ((await Company.count({ where: { emailDomain: emailDomain } })) > 0) {
      // emailDomain in DB

      await Company.update({
        name: name,
        contactEmail: contactEmail
      }, { where: { emailDomain: emailDomain } })

      const company = await Company.findOne({ where: { emailDomain: emailDomain } })
      await stripe.customers.update(company?.getDataValue("stripeCustomerId"), { name: name, email: contactEmail });

      return Response.json({
        id: company?.getDataValue("id")
      })

    } else {

      const customer = await stripe.customers.create({
        name: name,
        email: contactEmail,
      });

      const company = await Company.create({
        name: name,
        emailDomain: emailDomain,
        contactEmail: contactEmail,
        stripeCustomerId: customer.id
      })

      return Response.json({
        id: company?.getDataValue("id")
      })

    }

  } else {

    if ((await Company.count({ where: { contactEmail: contactEmail } })) > 0) {
      // Email in DB

      await Company.update({ name: name }, { where: { contactEmail: contactEmail } })
      const company = await Company.findOne({ where: { contactEmail: contactEmail } })
      await stripe.customers.update(company?.getDataValue("stripeCustomerId"), { name: name });

      return Response.json({
        id: company?.getDataValue("id")
      })

    } else {
      // New Email

      const customer = await stripe.customers.create({
        name: name,
        email: contactEmail
      });

      const company = await Company.create({
        name: name,
        contactEmail: contactEmail,
        stripeCustomerId: customer.id
      })

      await sendMail(
        {
          title: "Info!",
          message:
            "Eine Business E-Mail, wie info@swiftreach.de, lässte Sie seriöser aussehen!",
        },
        infoEmailSender,
        [contactEmail]
      );

      return Response.json({ id: company?.getDataValue("id"), info: "Eine Business E-Mail, wie info@swiftreach.de, lässte Sie seriöser aussehen!" })

    }

  }
}

