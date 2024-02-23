import { Sender, sendMail } from "@/lib/mailer";

const infoEmailSender: Sender = {
 email: "marketing@swiftreach.de",
 password: "BFs32t%vdg^@zP9vQYU2",
 name: "SwiftReach",
};

export async function sendVerificationMail(
 email: string,
 verificationCode: string
) {
 await sendMail(
  {
   title: `Ups 🤷‍♂️ - Passwort vergessen... 😉`,
   message: `https://swiftreach.de/verify?email=${email}&verificationCode=${verificationCode}`,
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
   title: `Meeting Arranged! 🙂`,
   message: invitationLink,
  },
  infoEmailSender,
  [email]
 );
}
