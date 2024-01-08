import Footer from "../(components)/footer";
import Header from "../(components)/header";
import Clients from "./sections/clients";
import Strategy from "./sections/strategy";
import Hero from "./sections/hero";
import Offer from "./sections/offer";
import Reviews from "./sections/reviews";

export default function Home() {
 return (
  <div className="w-full h-full">
   <Header />
   <div>
    <Hero />
    <Offer />
    <Reviews />
    <Clients />
    <Strategy />
   </div>
   <Footer />
  </div>
 );
}
