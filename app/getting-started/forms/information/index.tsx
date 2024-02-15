"use client";

import React, { useState } from "react";
import Buttons from "../(components)/Buttons";
import { TextInput } from "../(components)/FormInputs/TextInput";

import LoadingIndicator from "../(components)/LoadingIndicator";
import { toast } from "sonner";
import axios from "axios";

const Information = (props: any) => {
 const { button, data, setData } = props;

 const [loading, setLoading] = useState(false);

 const [name, setName] = useState("");
 const [nameError, setNameError] = useState(false);

 const [email, stEmail] = useState("");
 const [emailError, setEmailError] = useState(false);

 const submit = async () : Promise<boolean> => {

  if (!(name && email)) {
   setNameError(!name);
   setEmailError(!email);
   toast.warning("Whoops!", {
    description: "Please fill out the missing fields!",
   });
   return false
  }

  try {
   setLoading(true);

   const { company } = (await axios.post("/api/company", {
    name: name,
    contactEmail: email,
   })).data;

   setData({
    ...data,
    companyId: company.id,
   });

   await axios.post("/api/company/painpoints", {
    companyId: company.id,
    painpoints: data.painpoints,
   });

   const { account } = (await axios.post("/api/account", {
    email: email,
   })).data;

   setData({
    ...data,
    accountId: account.id,
   });

   setLoading(false);

   return true;
  } catch (error: any) {
   setLoading(false);

   console.log(error)

   toast.warning("Whoops!", {
    description: error.response?.data.error,
   });

   return false;
  }
 }

 return (
  <div className="w-1/2 flex flex-col justify-center">
   <div className="flex justify-center">
    <LoadingIndicator loading={loading}>
     <div className="w-full flex flex-col justify-center gap-4">
      {/* <div className="flex flex-col pb-4">
       <div className="flex justify-center text-[32px] text-white">
        
       </div>
      </div> */}
      <TextInput
       label="Unternehmens Name"
       placeholder="SwiftReach"
       value={name}
       set={setName}
       error={nameError}
      />
      <TextInput
       label="E-Mail"
       placeholder="contact@swiftreach.de"
       value={email}
       set={stEmail}
       error={emailError}
      />
     </div>
    </LoadingIndicator>
   </div>
   <Buttons submit={submit} button={button} />
  </div>
 );
};

export default Information;
