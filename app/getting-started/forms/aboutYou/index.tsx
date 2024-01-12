"use client";

import React, { useState } from "react";
import Buttons from "../(components)/Buttons";
import { TextInput } from "../(components)/FormInputs/TextInput";

import LoadingIndicator from "../(components)/LoadingIndicator";
import { toast } from "sonner"
import axios from "axios";

const AboutYou = (props: any) => {
  const { button, data, setData } = props;

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);

  const [email, stEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  async function submit() {
    if (name && email) {
      try {
        setLoading(true);

        const res = await axios.post("/api/company", { name: name, contactEmail: email })

        const { error, info, id } = res.data;

        if (error) {

          setLoading(false)

          toast.warning("Whoops!", {
            description: error
          })

        } else {
          setData({
            ...data,
            id: id,
          });

          setLoading(false);

          if (info) {
            toast.info("Info", {
              description: info,
            })
          }

          button.submit();
        }

      } catch (error) {
        console.log(error);
      }
    } else {
      setNameError(!name);
      setEmailError(!email);
      toast.warning("Whoops!", {
        description: "Please fill out the missing fields!",
      })
    }
  }

  return (
    <div className="w-1/2 flex flex-col justify-center">
      <div className="flex justify-center">
        <LoadingIndicator loading={loading}>
          <div className="w-full flex flex-col justify-center gap-4">
            <div className="flex flex-col pb-4">
              <div className="flex justify-center text-[32px] text-white">
                Tell Us Something About Your Business
              </div>
            </div>

            <TextInput
              label="Business Name"
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

export default AboutYou;
