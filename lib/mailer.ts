import { createTransport } from "nodemailer";

export type Message = {
 title: string;
 message: string;
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
 recipients: Array<string>
) {
 const from = sender.name
  ? '"' + sender.name.split(" ").at(0) + '" <' + sender.email + ">"
  : sender.email;

 createTransport({
  host: "smtp.strato.de",
  port: 465,
  secure: true,
  auth: {
   user: sender.email,
   pass: sender.password,
  },
 }).sendMail({
  from: from,
  to: recipients,
  subject: message.title,
  text: message.message,
  html: message.html ?? undefined,
 });
}
