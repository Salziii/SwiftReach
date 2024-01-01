"use client";

import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import {
 Carousel,
 CarouselContent,
 CarouselItem,
 CarouselNext,
 CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function Reviews() {
 return (
  <section className="w-screen" id="reviews">
   <div className="w-screen flex flex-col justify-center my-20">
    <motion.div
     transition={{
      type: "spring",
      stiffness: 40,
      damping: 10,
     }}
     initial={{ rotateZ: 360 }}
     whileInView={{ rotateZ: 0 }}
     viewport={{ once: true }}
     className="flex justify-center mb-10 text-5xl font-bold text-yellow-400"
    >
     <Star size={120} />
    </motion.div>
    <motion.div
     transition={{
      type: "spring",
      damping: 10,
      stiffness: 100,
     }}
     initial={{ opacity: 0, scale: 0.75 }}
     whileInView={{ opacity: 1, scale: 1 }}
     viewport={{ once: true }}
     className="flex justify-center mb-16 text-5xl font-bold"
    >
     Was Kunden Über Uns Sagen
    </motion.div>
    <motion.div
     transition={{
      type: "spring",
      damping: 10,
      stiffness: 100,
      delay: 0.25
     }}
     initial={{ opacity: 0, scale: 0.75 }}
     whileInView={{ opacity: 1, scale: 1 }}
     viewport={{ once: true }}
     className="w-full h-full mb-10 flex justify-center"
    >
     <Carousel
      opts={{
       align: "start",
      }}
      orientation="horizontal"
      className="w-1/2"
     >
      <CarouselContent className="-mt-1">
       {Array.from({ length: 5 }).map((_, index) => (
        <CarouselItem key={index}>
         <div className="h-full">
          <Card className="h-full rounded-2xl">
           <CardTitle className="flex justify-between px-10 py-8">
            <p className="font-bold text-card-foreground text-md">
             Bewertung {index + 1}
            </p>
            <div className="flex flex-row gap-1 text-yellow-400">
             {Array.from({ length: index + 1 }).map((_, i) => (
              <Star />
             ))}
             {Array.from({ length: 4 - index }).map((_, i) => (
              <Star className="text-muted-foreground" />
             ))}
            </div>
           </CardTitle>
           <CardContent className="flex flex-col gap-3">
            <Skeleton className="h-7 w-full mb-3" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
           </CardContent>
           <CardFooter className="h-flex justify-between text-card"></CardFooter>
          </Card>
         </div>
        </CarouselItem>
       ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
     </Carousel>
    </motion.div>
   </div>
  </section>
 );
}
