import { google } from "googleapis";
import { generateTimespans, isSameMinute, overlaps } from "../dateUtils";
import { getOAuth2Client } from "./auth";

const getApointments = (day: Date) =>
 new Promise<any[]>(async (resolve, reject) => {
  const auth = await getOAuth2Client();

  const start = new Date(
   day.getFullYear(),
   day.getMonth(),
   day.getDate(),
   0,
   0
  );

  const end = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 24, 0);

  google.calendar({ version: "v3", auth }).events.list(
   {
    calendarId: "primary",
    timeMin: start.toISOString(),
    timeMax: end.toISOString(),
    timeZone: "Europe/Berlin",
    maxResults: 11,
    singleEvents: true,
    orderBy: "startTime",
    q: "Appointment",
   },
   (err, res) => {
    if (err) return reject(err);

    if (!res || !res.data.items) return resolve([]);

    return resolve(
     res.data.items.map((event) => {
      return {
       start: new Date(event.start!.dateTime!),
       end: new Date(event.end!.dateTime!),
      };
     })
    );
   }
  );
 });

const setAppointment = async (
 start: Date,
 end: Date,
 title: string = "",
 description: string = "",
 attendees: any[] = []
) => {
 const auth = await getOAuth2Client();

 const res = await google.calendar({ version: "v3", auth }).events.insert({
  auth: auth,
  calendarId: "primary",
  conferenceDataVersion: 1,
  requestBody: {
   conferenceData: {
    createRequest: {
     requestId: "create-meeting",
     conferenceSolutionKey: {
      type: "hangoutsMeet",
     },
    },
    conferenceSolution: {
     iconUri: "/logo.png",
     name: title + " - Appointment",
    },
   },
   summary: title + " - Appointment",
   description: description,
   start: {
    dateTime: start.toISOString(),
   },
   end: {
    dateTime: end.toISOString(),
   },
   attendees: attendees,
   reminders: {
    useDefault: false,
    overrides: [
     { method: "email", minutes: 24 * 60 },
     { method: "popup", minutes: 10 },
    ],
   },
  },
 });

 return res;
};

const weekdayTimes : any[] = [
 {
  start: "14:00",
  end: "21:00"
 },
 {
  start: "14:00",
  end: "21:00"
 },
 {
  start: "15:30",
  end: "21:00"
 },
 {
  start: "15:30",
  end: "21:00"
 },
 {
  start: "14:00",
  end: "21:00"
 },
 {
  start: "09:00",
  end: "21:00"
 },
 {
  start: "09:00",
  end: "21:00"
 }
]

const getAvailableTimespans = async (day: Date) => {

 const startTime = weekdayTimes.at(day.getDay()).start
 const endTime = weekdayTimes.at(day.getDay()).end
 const duration = 20 * 60 * 1000;
 const pauseDuration = 25 * 60 * 1000;

 const start = new Date(
  day.getFullYear(),
  day.getMonth(),
  day.getDate(),
  Number(startTime.split(":")[0]),
  Number(startTime.split(":")[1])
 );
 const end = new Date(
  day.getFullYear(),
  day.getMonth(),
  day.getDate(),
  Number(endTime.split(":")[0]),
  Number(endTime.split(":")[1])
 );

 const timespans = generateTimespans(start, end, duration, pauseDuration);
 const appointments = await getApointments(day);

 return timespans.filter((timespan) => !overlaps(timespan, appointments));
};

const isAvailable = async (date: Date) => {
 const timespans: any[] = await getAvailableTimespans(date);
 return !!timespans.filter((timespan: any) =>
  isSameMinute(date, new Date(timespan.start))
 )[0];
};

export { getApointments, getAvailableTimespans, isAvailable, setAppointment };
