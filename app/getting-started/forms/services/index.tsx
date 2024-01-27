import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
import LoadingIndicator from "../(components)/LoadingIndicator";
import Buttons from "../(components)/Buttons";
import ServiceCard from "./(components)/ServiceCard";
import { toast } from "sonner";
import { Painpoint, Service } from "@/sql/models";
import { Model } from "sequelize-typescript";

function useAsyncEffect(effect: (isCanceled: () => boolean) => Promise<void>, dependencies?: any[]) {
 return useEffect(() => {
   let canceled = false;
   effect(() => canceled);
   return () => { canceled = true; }
 }, dependencies)
}

const Services = ({
 button,
 data,
 setData,
}: {
 button: any;
 data: any;
 setData: any;
}) => {
 const [loading, setLoading] = useState(false);

 const [services, setServices] = useState<any[]>([]);
 const [selectedServices, setSelectedServices] = useState<number[]>([]);

 const handleClick = (i: number) => {
  const tempArray = [...selectedServices];
  if (tempArray[i] == i) {
   delete tempArray[i];
  } else {
   tempArray[i] = i;
  }
  setSelectedServices(tempArray);
 };

 useAsyncEffect(async () => {
  setLoading(true);
  const res = await axios.get("/api/services");
  setServices(res.data);
  for (const painpoint of data.painpoints) {
   const res = await axios.get(
    "/api/services/fromPainpoint?painpointId=" + painpoint
   );
   const resServices: any[] = res.data;
   for (const service of resServices) {
    const i: number = service.id;
    const tempArray: number[] = selectedServices;
    tempArray[i] = i;
    setSelectedServices(tempArray);
   }
  }
  setLoading(false);
 }, []);

 async function submit() {
  setData({
   ...data,
   services: selectedServices.map((i) => services.at(i).id),
  });
  return true;
 }

 return (
  <div className="w-5/6 flex flex-col justify-center">
   <LoadingIndicator loading={loading || !services}>
    <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
     {services.map((service) => (
      <ServiceCard
       service={service}
       selected={selectedServices[service.id] == service.id}
       handleClick={handleClick}
      />
     ))}
    </div>
    <Buttons submit={submit} button={button} />
   </LoadingIndicator>
  </div>
 );
};

export default Services;
