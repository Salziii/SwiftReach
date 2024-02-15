"use client";

import { useState } from "react";
import { ArrowBigLeftIcon, ArrowBigRightIcon } from "lucide-react";
import axios from "axios";
import useAsyncEffect from "@/lib/asyncEffect";
import Timestamps from "./(components)/timestamps";
import { ThreeDot } from "react-loading-indicators";

type Day = {
  date: string,
  available: boolean
}

const weekdays = [
  "Mo",
  "Di",
  "Mi",
  "Do",
  "Fr",
  "Sa",
  "So"
]

const Appointment = ({
  button,
  data,
  setData,
}: {
  button: any;
  data: any;
  setData: any;
}) => {

  const [choosenMonth, setChoosenMonth] = useState<Date>(new Date())

  const [loadingDays, setLoadingDays] = useState<boolean>(true)
  const [days, setDays] = useState<Day[] | undefined>(undefined)
  const [padding, setPadding] = useState<number>(0)
  const [choosenDay, setChoosenDay] = useState<Day | undefined>(undefined)

  useAsyncEffect(async () => {
    setLoadingDays(true)
    const res = await axios.get("/api/appointment/days?date=" + choosenMonth.toISOString())
    setDays(res.data)
    setPadding(weekdays.indexOf(new Date(res.data[0]!.date).toLocaleDateString("default", { weekday: "short" })))
    setLoadingDays(false)
  }, [choosenMonth])

  return <div className="w-full h-full flex flex-col justify-center select-none">
    <div className="flex justify-center">
      <div className={`${choosenDay ? "w-5/6" : "w-1/2"} h-[700px]`}>
        <div className="w-full flex">
          <div className={`transition-all p-4 ${choosenDay ? "w-2/3" : "w-full"} h-full`}>
            <div className="w-full flex justify-center mt-4">
              <div className="flex flex-col justify-center">
                <ArrowBigLeftIcon
                  onClick={() => {
                    const tmpMonth = new Date(choosenMonth)
                    tmpMonth.setMonth(choosenMonth.getMonth() - 1)
                    setChoosenMonth(tmpMonth);
                  }}
                  size={32}
                />
              </div>
              <div className="flex justify-center min-w-64">
                <h1 className="font-bold flex flex-col justify-center text-2xl mx-8">{choosenMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</h1>
              </div>
              <div className="flex flex-col justify-center">
                <ArrowBigRightIcon
                  onClick={() => {
                    const tmpMonth = new Date(choosenMonth)
                    tmpMonth.setMonth(choosenMonth.getMonth() + 1)
                    setChoosenMonth(tmpMonth);
                  }}
                  size={32}
                />
              </div>
            </div>
            {
              (loadingDays || !days)
                ? <div className="w-full h-[500px] flex flex-col justify-center">
                  <ThreeDot variant="bob" color="#7e22ce" size="large" />
                </div>
                : (
                  <div className="w-full h-[500px] mt-8">
                    <div className="flex w-full justify-between mb-8">
                    {
                      weekdays.map((weekday, i) => (
                        <div key={i} className="w-full flex justify-center text-lg font-bold">{weekday}</div>
                      ))
                    }
                    </div>
                    <div className="w-full grid grid-cols-7 gap-y-4">
                      {[...Array(padding)].map((_, i) => <div key={i} />)}
                      {
                        days.map((day: Day, i) => (
                          <div key={i} className="flex justify-center">
                            <div
                              onClick={() => {
                                if (day.available) {
                                  if (choosenDay && day === choosenDay)
                                    setChoosenDay(undefined);
                                  else
                                    setChoosenDay(day);
                                }
                              }}
                              className={
                                `h-20 w-20 flex justify-center rounded-full
                                      ${day.available
                                  ? "bg-primary-foreground cursor-pointer text-black hover:scale-105"
                                  : "border-4 border-primary-foreground cursor-default text-primary-foreground"} 
                                      ${day === choosenDay
                                  ? "bg-secondary-foreground"
                                  : ""}`}>
                              <h1 className="flex flex-col justify-center text-2xl font-semibold">{new Date(day.date).toLocaleDateString("default", { day: "2-digit" })}</h1>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                )
            }
          </div>
          <div className={`transition-all ${choosenDay ? "w-1/3" : "w-0 hidden"}`}>
            {
              choosenDay
                ? <Timestamps day={new Date(choosenDay.date)} data={data} finish={button.submit} />
                : <></>
            }
          </div>
        </div>
      </div>
    </div>
  </div>
};

export default Appointment;
