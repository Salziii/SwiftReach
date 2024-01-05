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

import Link from "next/link";
import Image from "next/image";

import { DefaultMotion, RotateMotion } from "../motion";

const socials = [
 {
  link: "",
  icon: <Linkedin className="h-full w-full p-6 hover:text-blue-600" />,
 },
 {
  link: "",
  icon: <Instagram className="h-full w-full p-6 hover:text-pink-500" />,
 },
 {
  link: "",
  icon: <FaXTwitter className="h-full w-full p-6 hover:text-black" />,
 },
 {
  link: "",
  icon: <Github className="h-full w-full p-6 hover:text-gray-500" />,
 },
 {
  link: "",
  icon: <FaFacebook className="h-full w-full p-6 hover:text-blue-600" />,
 },
 {
  link: "https://g.co/kgs/ChbdJr",
  icon: <FaGoogle className="h-full w-full p-6 hover:text-red-500" />,
 },
];

export default function Footer() {
 return (
  <section id="footer">
   <div className="w-full h-32 bg-card flex flex-col justify-center shadow-2xl">
    <div className="flex justify-center">
     <div className="flex justify-between w-1/3">
      {socials.map((social, i) => (
       <RotateMotion delay={i * 0.2}>
        <Link href={social.link}>
         <div className="border-muted transition transform cursor-pointer border-2 rounded-full shadow-md w-20 h-20 hover:bg-muted hover:border-0 hover:opacity-90 hover:shadow-xl hover:-translate-y-1">
          {social.icon}
         </div>
        </Link>
       </RotateMotion>
      ))}
     </div>
    </div>
   </div>
   <div className="w-screen bg-popover flex justify-center shadow-2xl">
    <div className="w-5/6 my-16 flex flex-col justify-center">
     <div className="flex">
      <div className="px-10 xl:px-32 flex flex-col justify-center border-r-2">
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
      <div className="w-full flex justify-between px-10 xl:px-32">
       <div>
        <h1 className="text-xl font-semibold mb-4">Unternehmen</h1>
        <div className="flex flex-col gap-2">
         <Link
          className="flex justify-center transition hover:opacity-75"
          href="/imprint"
         >
          Impressum
         </Link>
        </div>
       </div>
       <div>
        <h1 className="text-xl font-semibold mb-4">Kontakt</h1>
        <div className="flex flex-col gap-2">
         <a
          href="mailto:contact@swiftreach.de"
          className="flex cursor-pointer transition hover:opacity-75"
         >
          <p className="mr-2">contact@swiftreach.de</p>
          <div className="flex flex-col justify-center">
           <RiMailSendLine   className="w-4" />
          </div>
         </a>
         <a
          href="tel:+491788688792"
          className="flex cursor-pointer transition hover:opacity-75"
         >
          <p className="mr-2">+49 (0) 178 8688792</p>
          <div className="flex flex-col justify-center">
           <BsTelephoneOutbound  className="w-4" />
          </div>
         </a>
         <p>@swift.reach</p>
        </div>
       </div>
       <div className="flex flex-col justify-center">
        <h1 className="text-xl font-semibold mb-5">Immer Am Neustem Stand</h1>
        <input className="px-3 py-1 mb-2 rounded-lg" placeholder="Name" />
        <input className="px-3 py-1 mb-2 rounded-lg" placeholder="E-Mail" />
        <button className="bg-card py-1 rounded-lg">Abbonieren</button>
       </div>
      </div>
     </div>
    </div>
   </div>
   <div className="w-screen h-16 bg-popover flex flex-row justify-center">
    <div className="w-5/6 border-t-2 border-t-card flex flex-col justify-center">
     <div className="flex justify-center">
      <p>© 2024 SwiftReach</p>
     </div>
    </div>
   </div>
  </section>
 );
}
