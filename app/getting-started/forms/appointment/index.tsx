"use client";

import axios, { AxiosError } from "axios";
import { ArrowBigLeftIcon, ArrowBigRightIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { ThreeDot } from "react-loading-indicators";
import { toast } from "sonner";
import Timestamps from "./(components)/timestamps";

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

  useEffect(() => {
    (async () => {
      setLoadingDays(true)
      try {
        const data = (await axios.get("/api/meetings/days?date=" + choosenMonth.toISOString())).data
        setDays(data)
        setPadding(weekdays.indexOf(new Date(data[0]!.date).toLocaleDateString("default", { weekday: "short" })))
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.warning("Whoops", { description: error.response?.data.error })
        }
        console.error(error)
      }
      setLoadingDays(false)
    })()
  }, [choosenMonth])

  return <div className="w-full h-full flex flex-col justify-center select-none">
    <div className="flex justify-center">
      <div className={`${choosenDay ? "w-5/6" : "w-1/2"} h-[700px]`}>
        <div className="w-full flex">
          <div className={`transition-all p-4 ${choosenDay ? "w-2/3" : "w-full"} h-full`}>
            <div className="flex justify-center mb-8 font-bold text-4xl">
              Discovery Call - 20 Minuten
            </div>
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
                ? <Timestamps day={new Date(choosenDay.date)} finish={button.submit} />
                : <></>
            }
          </div>
        </div>
      </div>
    </div>
  </div>
};

export default Appointment;
