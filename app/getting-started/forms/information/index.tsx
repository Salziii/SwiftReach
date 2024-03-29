"use client";

import { useState } from "react";
import Buttons from "../(components)/Buttons";
import { TextInput } from "../../../(components)/FormInputs/TextInput";

import axios from "axios";
import { ThreeDot } from "react-loading-indicators";
import { toast } from "sonner";
import { emailValid } from "@/lib/utils";

const Information = ({
 button,
 data,
 setData,
}: {
 button: any;
 data: any;
 setData: (data: any) => any;
}) => {
 const [loading, setLoading] = useState(false);

 const [name, setName] = useState("");
 const [nameError, setNameError] = useState<string>("");

 const [email, setEmail] = useState("");
 const [emailError, setEmailError] = useState<string>("");
 const validateEmail = (email:string) => {
  if (emailValid(email)) setEmailError("")
  else setEmailError("Provide a valid email!")
  setEmail(email)
 }

 const submit = async (): Promise<boolean> => {
  if (!name || !email) {
   toast.warning("Whoops!", {
    description: "Please fill out the missing fields!",
   });
   return false;
  }

  if (!emailValid(email)) {
   toast.warning("Whoops!", {
    description: "Please provide a valid email!",
   });
  }

  setData({
   ...data,
   email: email,
   name: name,
  });

  try {
   setLoading(true);

   await axios.post("/api/companies", {
    name: name,
    contactEmail: email,
   });

   await axios.post("/api/accounts", {
    email: email,
   });

   // await axios.post("/api/companies/company/painpoints", { ! TODO
   //  painpoints: data.painpoints
   // });

   setLoading(false);

   return true;
  } catch (error: any) {
   setLoading(false);

   console.error(error);

   toast.warning("Whoops!", {
    description: error.response?.data.error,
   });

   return false;
  }
 };

 return (
  <div className="w-5/6 lg:w-2/3 2xl:w-1/2 flex flex-col justify-center">
   <div className="flex justify-center">
    {loading ? (
     <ThreeDot color="#782dac" size="large" variant="bob" />
    ) : (
     <div className="w-full flex flex-col justify-center gap-4">
      <TextInput
       label="Name"
       placeholder="SwiftReach"
       value={name}
       set={setName}
       error={nameError}
      />
      <TextInput
       type="email"
       label="E-Mail"
       placeholder="contact@swiftreach.de"
       value={email}
       set={validateEmail}
       error={emailError}
      />
     </div>
    )}
   </div>
   <Buttons submit={submit} button={button} />
  </div>
 );
};

export default Information;
