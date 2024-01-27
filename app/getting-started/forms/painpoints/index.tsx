import React, { useEffect, useState } from "react";
import Buttons from "../(components)/Buttons";
import PainpointCard from "./(components)/PainpointCard";
import LoadingIndicator from "../(components)/LoadingIndicator";
import { toast } from "sonner";
import axios from "axios";

const Painpoints = (props: any) => {
 const { button, data, setData } = props;

 const [loading, setLoading] = useState(false);

 const [painpoints, setPainpoints] = useState<any[]>([]);
 const [selectedPainpoints, setSelectedPainpoints] = useState<number[]>([]);

 const handleClick = (i: number) => {
  const tempArray = [...selectedPainpoints];
  if (tempArray[i] == i) {
   delete tempArray[i];
  } else {
   tempArray[i] = i;
  }
  setSelectedPainpoints(tempArray);
 };

 useEffect(() => {
  setLoading(true);
  axios
   .get("/api/painpoints", {})
   .then((res) => res.data)
   .then((data) => {
    setPainpoints(data);
    setLoading(false);
   });
 }, []);

 async function submit() {
  setData({
   ...data,
   painpoints: selectedPainpoints.map((i) => painpoints.at(i).id),
  });
  return true;
 }

 return (
  <div className="w-5/6 flex flex-col justify-center">
   <LoadingIndicator loading={loading || !painpoints}>
    <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
     {painpoints.map((painpoint, i) => (
      <PainpointCard
       painpoint={painpoint}
       selected={selectedPainpoints[i] == i}
       handleClick={handleClick}
       index={i}
      />
     ))}
    </div>
    <Buttons submit={submit} button={button} />
   </LoadingIndicator>
  </div>
 );
};

export default Painpoints;
