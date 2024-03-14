import { createTransport } from "nodemailer";
import prisma from "@/prisma/database"
import jwt from "jsonwebtoken";

export type Message = {
 label: string;
 text?: string;
 html?: string;
};

export type Sender = {
 email: string;
 password: string;
 name?: string;
};

export async function sendMail(
 message: Message,
 sender: Sender,
 recipients: string[]
) {

 const from = sender.name
  ? '"' + sender.name.split(" ").at(0) + '" <' + sender.email + ">"
  : sender.email;

 const transport = createTransport({
  host: "smtp.strato.de",
  port: 465,
  secure: true,
  auth: {
   user: sender.email,
   pass: sender.password,
  }
 })

 if (!message.text && !message.html) throw new Error("Provide HTML or a Text Message!")

 for (let i = 0; i < recipients.length; i++) {

  const recipient = recipients[i];

  const dbEmail = await prisma.sentEmail.create({ data: { label: message.label, senderEmail: sender.email, email: recipient } })
  const token = jwt.sign(dbEmail, process.env.JWT_SECRET_KEY!)

  const pixel = `<img src="https://swiftreach.de/api/track/email/${token}" width="1" height="1" />`
 
  let content

  if (message.text) {
   content = `<html><body><p>${message.text}</p>${pixel}</body></html>`
  }
  if (message.html) {
   content = `<html><body>${message.html}${pixel}</body></html>`
  }

  transport.sendMail({
   from: from,
   to: recipient,
   subject: message.label,
   html: content
  })
 }
}