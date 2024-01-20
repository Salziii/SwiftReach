import Image from "next/image";

export default function FourthSection() {
 return (
  <div className="w-full h-full flex flex-col justify-center">
   <div>
    <Image
     className="mb-2 scale-150 transition transform group-hover:-translate-y-2 group-hover:scale-105"
     src="/strategy/4.webp"
     width={300}
     height={300}
     alt=""
    />
    Title
   </div>
  </div>
 );
}
