"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";
import axios from "axios";
import useAsyncEffect from "@/lib/asyncEffect";
import { ScrollArea } from "@/components/ui/scroll-area"
import LoadingIndicator from "../../(components)/LoadingIndicator";
import { ThreeDot } from "react-loading-indicators";
import { toast } from "sonner";

type Timestamp = {
  start: string
  end: string
}

const Timestamps = ({
  day,
  data,
  finish
}: {
  day: Date;
  data: any;
  finish: () => void
}) => {

  const [timestampsLoading, setTimestampsLoading] = useState<boolean>(true)
  const [bookingLoading, setBookingLoading] = useState<boolean>(false)

  const book = async (timestamp: Timestamp) => {
    setBookingLoading(true)

    if (data.accountId) {

      const res = await axios.post("/api/appointment?date=" + timestamp.start, {
        accountId: data.accountId
      })

      if (!res.data.error) finish()
      else {
        setBookingLoading(false)

        toast.warning("Whoops!", {
          description: res.data.error
        })
      }

    } else {

      setBookingLoading(false)

      toast.warning("Whoops!", {
        description: "Something went wrong!"
      })

    }
  }

  const [timestamps, setTimestamps] = useState<Timestamp[]>([])

  useAsyncEffect(async () => {
    setTimestampsLoading(true)
    const res = await axios.get("/api/appointment/timespans?date=" + day.toISOString())
    setTimestamps(res.data as Timestamp[]);
    setTimestampsLoading(false)
  }, [])

  const [choosenTimestamp, setChoosenTimestamp] = useState<Timestamp | undefined>(undefined)

  return <div className="h-[700px] w-full flex flex-col">
    <h1 className="px-3 pb-4 font-bold text-3xl">{day.toLocaleDateString("default", { weekday: "short", day: "numeric", month: "long", year: "numeric" })}</h1>
    <LoadingIndicator loading={!timestamps || timestampsLoading}>
      <ScrollArea className="h-full w-full">
        <div className="px-4 py-1 flex flex-col gap-4">
          {timestamps.map((timestamp: Timestamp, i: number) => (
            <div key={i} className="flex justify-between">
              <div
                onClick={() => {
                  if (!bookingLoading) {
                    if (choosenTimestamp === timestamp) {
                      setChoosenTimestamp(undefined)
                    } else {
                      setChoosenTimestamp(timestamp)
                    }
                  }
                }}
                className={
                  `transition-all h-20 border-[2.5px] border-primary-foreground rounded-lg flex flex-col justify-center hover:scale-[1.025] cursor-pointer group 
                  ${(choosenTimestamp === timestamp)
                    ? "w-[49%]"
                    : "w-full"
                  }`
                }
              >
                <h1 className="flex justify-center text-xl font-black text-primary-foreground">{new Date(timestamp.start).toLocaleTimeString("default", { hour: "2-digit", minute: "2-digit" })}</h1>
              </div>
              <div
                onClick={() => book(timestamp)}
                className={
                  `transition-all h-20 bg-primary-foreground rounded-lg flex flex-col justify-center hover:scale-[1.025] cursor-pointer group 
                  ${(choosenTimestamp === timestamp)
                    ? "w-[49%]"
                    : "w-0 hidden"
                  }`
                }
              >
                <h1 className="flex justify-center text-xl font-semibold group">
                  {
                    bookingLoading
                      ? <ThreeDot variant="bob" color="white" size="small" />
                      : <CheckCircle className="transition-all group-hover:scale-110" size={32} />
                  }
                </h1>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </LoadingIndicator>
  </div>
};

export default Timestamps;


