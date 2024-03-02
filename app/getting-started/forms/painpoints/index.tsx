"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Buttons from "../(components)/Buttons";
import PainpointCard from "./(components)/PainpointCard";
import { ThreeDot } from "react-loading-indicators";

const Painpoints = ({
 button,
 data,
 setData,
}: {
 button: any;
 data: any;
 setData: (data: any) => any;
}) => {
 const [loading, setLoading] = useState<boolean>(true);
 const [painpoints, setPainpoints] = useState<any[] | undefined>();

 useEffect(() => {
  (async () => {
   setLoading(true);
   const res = await axios.get("/api/painpoints");
   setPainpoints(res.data);
   setLoading(false);
  })();
 }, []);

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

 async function submit() {
  setData({
   ...data,
   painpoints: selectedPainpoints.map((i) => painpoints?.at(i).id),
  });
  return true;
 }

 return (
  <div className="w-5/6 flex flex-col justify-center">
   {!painpoints || loading ? (
    <ThreeDot color="#782dac" size="large" variant="bob" />
   ) : (
    <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
     {painpoints.map((painpoint, i) => (
      <PainpointCard
       key={i}
       handleClick={() => handleClick(i)}
       painpoint={painpoint}
       selected={selectedPainpoints[i] == i}
      />
     ))}
    </div>
   )}
   <Buttons submit={submit} button={button} />
  </div>
 );
};

export default Painpoints;
