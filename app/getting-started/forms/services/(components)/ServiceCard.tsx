import Image from "next/image";

const ServiceCard = ({ service, selected, handleClick }: { service: any, selected: boolean, handleClick:any }) => {

 return (
  <div onClick={()=>handleClick(service.id)} className={`transition transform hover:-translate-y-1 h-32 py-3 px-4 flex justify-start bg-transparent border-2 ${selected ? "border-primary-foreground scale-[1.025]" : ""} hover:opacity-80 shadow-lg hover:shadow-sm rounded-lg cursor-pointer`}>
   <div className="w-16 flex justify-center">
    <div className="flex flex-col justify-center">
     <Image src={service.image} alt={""} width={100} height={100} />
    </div>
   </div>
   <div className="pl-4 flex flex-col justify-center">
    <div className="flex flex-col justify-end">
     <h1 className="text-bold text-[20px] text-white">{service.name}</h1>
    </div>
    <div className="flex flex-col">
     <p className="text-normal text-[13px] text-white">
      {service.description ?? ""}
     </p>
    </div>
   </div>
  </div>
 );
};

export default ServiceCard;
