import { sendMail } from "@/lib/mailer";
import { emailValid, getEmailDomain, isCustomEmail } from "@/lib/utils";
import emailProviders from 'email-providers/all.json' assert {type: 'json'}
import Stripe from "stripe";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY!,
  {
    typescript: true,
    apiVersion: "2023-10-16",
  }
);

export async function POST(request: Request) {

  return Response.json({ error: { title: "Maintenance Mode", description: "This route is currently in maintenance mode!" } });

  const { name, email } = await request.json()

  if (emailValid(email)) { return Response.json({ error: "Email is not valid!" }); }

  const emailDomain = getEmailDomain(email)
  const customEmail = isCustomEmail(email)

  // Wenn Custom Email
  //  Wenn emailDomain in Datenbank
  //   In Db & Stripe, contactMail & name überschreiben
  //   Info schicken, dass geändert -> Vorherige Email
  //  Sonst
  //   Email & Name -> Stripe Customer 
  //   emailDomain, stripe_customer_id, contactEmail, name -> DB 
  // Sonst
  //  Wenn Email in Datenbank
  //   In Db & Stripe, name überschreiben
  //  Sonst 
  //   Email & Name -> Stripe Customer
  //   stripe_customer_id, contactEmail, name -> DB
  //   Info, dass Cusom Email besser sind -> Email (oder nichts machen & Später Cusom Email Service anbieten)

  if (isCustomEmail(email)) {

    if (false) { // DB c emailDomain

      // name -u-> DB
      // emailDomain -> DB -> stripe_customer_id

      const stripeCustomerId = ""
      const customer = await stripe.customers.update(stripeCustomerId, { name: name, email: email });

    }

  } else {

    if (false) { // DB c email

      // name -u-> DB
      // email -> DB -> stripe_customer_id
      const stripeCustomerId = ""
      const customer = await stripe.customers.update(stripeCustomerId, { name: name });

    } else {

      const customer = await stripe.customers.create({
        name: name,
        email: email
      });

      // customer.id, email, name -> DB

    }


  }



  // await sendMail(
  //   {
  //     title: "It Is A Honor!",
  //     message:
  //       "Hi, " + name + ", it is an honor for us to work with you! Your Stripe Customer ID: " +
  //       customer.id,
  //   },
  //   {
  //     email: "marketing@swiftreach.de",
  //     password: "BFs32t%vdg^@zP9vQYU2",
  //     name: "SwiftReach",
  //   },
  //   [email]
  // );

  return Response.json({ erro: null, customer_id: undefined });
}
