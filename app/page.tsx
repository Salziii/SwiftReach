import Header from "./(components)/header/Header";
import Clients from "./sections/clients";
import Gift from "./sections/gift";
import Hero from "./sections/hero";
import Offer from "./sections/offer";
import Reviews from "./sections/reviews";
import { motion } from "framer-motion";

export default function Home() {
 return (
  <>
   <Header />
   <div>
    <Hero />
    <Offer />
    <Reviews />
    <Clients />
    <Gift />
   </div>
  </>
 );
}
