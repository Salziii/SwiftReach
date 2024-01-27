import LoadingIndicator from "../(components)/LoadingIndicator";
import Buttons from "../(components)/Buttons";
import { useState } from "react";

const Appointment = ({
 button,
 data,
 setData,
}: {
 button: any;
 data: any;
 setData: any;
}) => {
 const [loading, setLoading] = useState(false);

 async function submit() {
  return true;
 }
 
 return (
  <div className="w-5/6 flex flex-col justify-center">
   <LoadingIndicator loading={loading}>
    <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
     
    </div>
    <Buttons submit={submit} button={button} />
   </LoadingIndicator>
  </div>
 );
};

export default Appointment;
