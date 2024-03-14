import { Sender, sendMail } from "@/lib/mailer";

const infoEmailSender: Sender = {
 email: "noreply@swiftreach.de",
 password: "28mq$ac&Xu@2.zipAh=",
 name: "SwiftReach",
};

export async function sendVerificationMail(
 email: string,
 verificationCode: string
) {
 await sendMail(
  {
   label: `Ups 🤷‍♂️ - Passwort fehlt... 😉`,
   html: `
    <a href="https://swiftreach.de/verify?email=${email}&verificationCode=${verificationCode}">Hier hinzufügen!</a>
   `,
  },
  infoEmailSender,
  [email]
 );
}

export async function sendMeetingMail(email: string, invitationLink: string) {
 await sendMail(
  {
   label: `Meeting Arranged! 🙂`,
   text: invitationLink,
  },
  infoEmailSender,
  [email]
 );
}

export async function sendProspectEmail(email: string, content: string, label: string) {
 await sendMail(
  {
   label: label,
   text: content
  },
  infoEmailSender,
  [email]
 );
}