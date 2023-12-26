import { sendMail } from "@/lib/mailer";
import Stripe from "stripe";

const stripe = new Stripe(
 process.env.STRIPE_SECRET_KEY!,
 {
  typescript: true,
  apiVersion: "2023-10-16",
 }
);

export async function POST(request: Request) {

 const { name, email } = await request.json()

 // Validate Email

 // Wenn mail in db, kein cus erstelen
 // Wenn name abweicht, name überschreiben
 // Customer erstellen & In Db schreiben

 const customer = await stripe.customers.create({
  name: name,
  email: email,
 });

 await sendMail(
  {
   title: "It Is A Honor!",
   message:
    "Hi, " + name + ", it is an honor for us to work with you! Your Stripe Customer ID: " +
    customer.id,
  }, 
  {
   email: "marketing@swiftreach.de",
   password: "BFs32t%vdg^@zP9vQYU2",
   name: "SwiftReach",
  }, 
  [email]
 );

 return Response.json({ customer_id: customer.id });
}
