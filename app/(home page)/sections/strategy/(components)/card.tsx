
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Image from "next/image";

export default function Card({ index, label, duration, img, steps = [] }: { index: number, label: string, duration: string, img: string, steps: any[] }) {

  return <CardContainer className="inter-var w-1/2">

    <CardBody className="relative group/card hover:bg-black/10 w-full h-auto rounded-xl p-6 ">

      <CardItem
        translateZ="50"
        className="mt-2 w-full flex justify-center font-bold text-3xl bg-gradient-to-r from-[#00BCE8] to-[#0B88A8] text-transparent bg-clip-text"
      >
        Schritt {index}
      </CardItem>

      <CardItem translateZ={75} className="w-full flex justify-center font-bold text-5xl">
        {label}
      </CardItem>

      <CardItem
        as="p"
        translateZ="50"
        className="mt-2 w-full flex justify-center text-secondary-foreground font-bold text-2xl"
      >
        {duration}
      </CardItem>
      <CardItem translateZ="100" className="w-full mt-4">
        <Image
          src={img}
          height="196"
          width="140"
          className="w-full"
          alt="thumbnail"
        />
      </CardItem>
      <CardItem translateZ={75} className="w-full my-4">
        <div className="flex justify-center">
          <div className="flex flex-col gap-4">
            {
              steps.map((step: any, i: number) => (
                <div key={i} className="flex justify-center">
                  <span className="flex flex-col justify-center pr-2">
                    {step.icon ? <step.icon size={32} className="text-secondary-foreground" /> : <></>}
                  </span>
                  <p
                    className="flex flex-col justify-center text-xl font-semibold"
                  >
                    {step.title}
                  </p>
                </div>
              ))
            }
          </div>
        </div>
      </CardItem>
    </CardBody>
  </CardContainer>

}