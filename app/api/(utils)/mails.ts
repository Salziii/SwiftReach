import { Sender, sendMail } from "@/lib/mailer";

const infoEmailSender: Sender = {
 email: "marketing@swiftreach.de",
 password: "BFs32t%vdg^@zP9vQYU2",
 name: "SwiftReach",
};

export async function sendVerificationMail (email:string, verificationCode:string) {
 await sendMail(
  {
   title: `Hi - Verify Your Email!`,
   message: `https://swiftreach.de/verify?email=${email}&verificationCode=${verificationCode}`
  },
  infoEmailSender,
  [email]
 );
}

export async function sendMeetingMail ( email:string, invitationLink:string ) {
 await sendMail(
  {
   title: `Meeting Arranged! 🙂`,
   message: invitationLink
  },
  infoEmailSender,
  [email]
 );
}