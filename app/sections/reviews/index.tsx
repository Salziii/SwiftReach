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
import { Star } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { DefaultMotion, RotateMotion } from "@/app/(components)/motion";

export default function Reviews() {
 return (
  <section className="w-screen" id="reviews">
   <div className="w-screen flex flex-col justify-center my-10 sm:my-20">
    <RotateMotion className="flex justify-center mb-4 sm:mb-10 text-yellow-400">
     <Star className="h-24 sm:h-32" size={120} />
    </RotateMotion>
    <DefaultMotion className="flex justify-center mb-16 text-2xl sm:text-5xl font-bold">
     Was Kunden Über Uns Sagen
    </DefaultMotion>
    <DefaultMotion
     delay={0.25}
     className="w-full h-full mb-10 flex justify-center"
    >
     <Carousel
      opts={{
       align: "start",
       loop: true,
       dragFree: true,
      }}
      plugins={[
       Autoplay({
        delay: 4000,
       }),
      ]}
      orientation="horizontal"
      className="w-full px-2 sm:w-1/2"
     >
      <CarouselContent>
       {Array.from({ length: 5 }).map((_, index) => (
        <CarouselItem key={index}>
         <div className="h-full">
          <Card className="h-full rounded-2xl">
           <CardTitle className="flex justify-between px-10 py-8">
            <p className="font-bold text-card-foreground text-md">
             Bewertung {index + 1}
            </p>
            <div className="flex flex-row gap-1 text-yellow-400">
             {Array.from({ length: index + 1 }).map((_) => (
              <Star />
             ))}
             {Array.from({ length: 4 - index }).map((_) => (
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
    </DefaultMotion>
   </div>
  </section>
 );
}
