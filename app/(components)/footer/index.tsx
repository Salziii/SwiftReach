"use client";

import {
 Github,
 Instagram,
 Linkedin,
} from "lucide-react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { BsTelephoneOutbound } from "react-icons/bs";
import { RiMailSendLine } from "react-icons/ri";

import Image from "next/image";

import Link from "../transition/link";

const socials = [
 {
  link: "https://www.linkedin.com/company/swiftreach",
  icon: <Linkedin className="h-full w-full p-6 hover:text-blue-600" />,
 },
 {
  link: "https://www.instagram.com/swift.reach/",
  icon: <Instagram className="h-full w-full p-6 hover:text-pink-500" />,
 },
 {
  link: "https://www.facebook.com/profile.php?id=61554905276555",
  icon: <FaFacebook className="h-full w-full p-6 hover:text-blue-600" />,
 },
 {
  link: "https://g.co/kgs/ChbdJr",
  icon: <FaGoogle className="h-full w-full p-6 hover:text-red-500" />,
 },
];

export default function Footer() {
 return (
  <section id="footer" data-scroll-section>
   <div className="w-full h-32 bg-card hidden sm:flex flex-col justify-center shadow-2xl">
    <div className="flex justify-center">
     <div className="flex justify-between mx-10 md:mx-0 w-full md:w-2/3">
      {socials.map((social, i) => (
        <Link key={i} href={social.link}>
         <div className="border-muted transition transform cursor-pointer border-2 rounded-full shadow-md w-20 h-20 hover:bg-muted hover:border-0 hover:opacity-90 hover:shadow-xl hover:-translate-y-1">
          {social.icon}
         </div>
        </Link>
      ))} 
     </div>
    </div>
   </div>
   <div className="w-full bg-popover flex justify-center shadow-2xl">
    <div className="w-5/6 my-16 flex flex-col justify-center">
     <div className="flex flex-col xl:flex-row p-0">
      <div className="pb-12 xl:pb-0 px-10 xl:px-32 hidden md:flex flex-col justify-center xl:border-r-2">
       <Link href="/">
        <h1 className="flex justify-center gap-4">
         <Image
          className="w-16"
          src="/logo.png"
          alt="Logo"
          width={400}
          height={400}
         />
         <div className="flex flex-col justify-center">
          <p className="font-semibold text-xl">SwiftReach</p>
         </div>
        </h1>
       </Link>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-10 justify-around px-10 xl:px-32">
       <div>
        <h1 className="text-2xl font-semibold mb-4 flex justify-center">Unternehmen</h1>
        <div className="flex flex-col gap-2">
         <Link
          href="/imprint"
          className="flex justify-center cursor-pointer transition hover:opacity-75"
         >
          <p className="mr-2">Impressum</p>
         </Link>
        </div>
       </div>
       <div>
        <h1 className="text-2xl font-semibold mb-4 flex justify-center">Kontakt</h1>
        <div className="flex flex-col gap-2">
         <a
          href="mailto:contact@swiftreach.de"
          className="flex justify-center cursor-pointer transition hover:opacity-75"
         >
          <p className="mr-2">contact@swiftreach.de</p>
          <div className="flex flex-col justify-center">
           <RiMailSendLine   className="w-4" />
          </div>
         </a>
         <a
          href="tel:+491788688792"
          className="flex justify-center cursor-pointer transition hover:opacity-75"
         >
          <p className="mr-2">+49 (0) 178 8688792</p>
          <div className="flex flex-col justify-center">
           <BsTelephoneOutbound  className="w-4" />
          </div>
         </a>
         <p className="flex justify-center">@swift.reach</p>
        </div>
       </div>
       <div className="hidden flex-col justify-center">
        <h1 className="text-2xl font-semibold mb-5">Immer Am Neustem Stand</h1>
        <input className="px-3 py-1 mb-2 rounded-lg" placeholder="Name" />
        <input className="px-3 py-1 mb-2 rounded-lg" placeholder="E-Mail" />
        <button className="bg-card py-1 rounded-lg">Abbonieren</button>
       </div>
      </div>
     </div>
    </div>
   </div>
   <div className="w-full h-16 bg-popover flex flex-row justify-center">
    <div className="w-5/6 border-t-2 border-t-card flex flex-col justify-center">
     <div className="flex justify-center">
      <p>© 2024 SwiftReach</p>
     </div>
    </div>
   </div> 
  </section>
 );
}
