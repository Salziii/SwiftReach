import Stop from "./(components)/stop";
import FirstPage from "./pages/left/1";
import SecondPage from "./pages/left/2";
import ThirdPage from "./pages/left/3";
import RightSide from "./pages/right";

export default function Offer() {
 return (
  <section
   className="w-sceen bg-card text-white shadow-inner-all"
   id="offer"
  >
   <Stop
    stop={<RightSide />}
   >
    <FirstPage />
    <SecondPage />
    <ThirdPage />
   </Stop>
  </section>
 );
}
