"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import { Mail } from "lucide-react";
import { useEffect, useState } from "react";

export default function Dashboard() {

  const [emails, setEmails] = useState<any[] | undefined>();

  useEffect(() => {
    (async () => {
      setEmails((await axios.get("/api/admin/emails")).data);
    })();
  }, []);

  return emails ? <ScrollArea className="w-full h-screen">
      <div className="px-3 flex flex-col gap-2 my-3">
        {emails
          .sort((a, b) => (new Date(a.date) <= new Date(b.date) ? 1 : -1))
          .map((email, i) =>
            <Dialog key={i}>
              <DialogTrigger asChild>
                <div className="bg-background border w-full h-full rounded-xl shadow-sm flex">
                  <div
                    className="w-[15%] min-w-48 flex flex-col justify-center border-r-2 my-2"
                  >
                    <h1 className="w-full flex justify-center text-3xl font-bold">
                      {new Date(email.date).toLocaleString("default", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </h1>
                    <h1 className="w-full flex justify-center text-xl">
                      {new Date(email.date).toLocaleString("default", {
                        day: "numeric",
                        month: "long",
                      })}
                    </h1>
                  </div>
                  <div className="w-[70%] flex flex-col gap-1 justify-center ml-5">
                    <h1 className="text-xl font-bold">{email.label}</h1>
                    <h2>from <span className="font-bold">{email.senderEmail}</span> to <span className="font-bold">{email.email}</span></h2>
                  </div>
                  <div
                    className="w-[15%] min-w-48 flex flex-col justify-center border-l-2 my-2"
                  >
                    {email.opened
                      ? <div className="text-green-400">
                        <h1 className="w-full flex justify-center text-3xl font-bold">
                          {new Date(email.openingTime).toLocaleString("default", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </h1>
                        <h1 className="w-full flex justify-center text-xl">
                          {new Date(email.openingTime).toLocaleString("default", {
                            day: "numeric",
                            month: "long",
                          })}
                        </h1>
                      </div>
                      : <div className="text-red-400">
                        <h1 className="w-full flex justify-center text-xl font-bold">Not</h1>
                        <h1 className="w-full flex justify-center text-xl font-bold">Opened</h1>
                      </div>
                    }
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-7xl">
                <DialogHeader>
                  <DialogTitle>{email.id}</DialogTitle>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                  <div>
                    <DialogClose asChild>
                      <Button type="button" variant="outline">
                        Close
                      </Button>
                    </DialogClose>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
      </div>
    </ScrollArea>
  : <></>
}