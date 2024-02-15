import { calendar_v3, google } from "googleapis"
import { getOAuth2Client } from "./auth"

const getApointments = (start: Date, end: Date) => new Promise<any[]>(async (resolve, reject) => {

 const auth = await getOAuth2Client()

 google.calendar({ version: 'v3', auth }).events.list({
  calendarId: 'primary',
  timeMin: start.toISOString(),
  timeMax: end.toISOString(),
  timeZone: 'Europe/Berlin',
  maxResults: 11,
  singleEvents: true,
  orderBy: 'startTime',
  q: 'Appointment'
 }, (err, res) => {

  if (err) return reject(err)

  if (!res || !res.data.items) return resolve([])

  return resolve(res.data.items.map((event) => {
   return { start: new Date(event.start!.dateTime!), end: new Date(event.end!.dateTime!) };
  }))

 })
})

const setAppointment = async (start: Date, end: Date, title: string = "", description: string = "", attendees: any[] = []) => {

 const auth = await getOAuth2Client()

 const res = await google.calendar({ version: 'v3', auth }).events.insert({
  auth: auth,
  calendarId: 'primary',
  conferenceDataVersion: 1,
  requestBody: {
   conferenceData: {
    createRequest: {
     requestId: 'create-meeting',
     conferenceSolutionKey: {
      type: 'hangoutsMeet'
     }
    },
    conferenceSolution: {
     iconUri: "/logo.png",
     name: title + ' - Appointment'
    }
   },
   summary: title + ' - Appointment',
   description: description,
   start: {
    dateTime: start.toISOString()
   },
   end: {
    dateTime: end.toISOString()
   },
   attendees: attendees,
   reminders: {
    useDefault: false,
    overrides: [
     { method: 'email', minutes: 24 * 60 },
     { method: 'popup', minutes: 10 }
    ],
   },
  }
 })

 return res

}

export { getApointments, setAppointment }