export function isSameDay(day1: Date, day2: Date): boolean {
 if (day1.getFullYear() !== day2.getFullYear()) return false;
 if (day1.getMonth() !== day2.getMonth()) return false;
 if (day1.getDate() !== day2.getDate()) return false;
 return true;
}

export function isSameMinute(date1: Date, date2: Date) {
 if (date1.getFullYear() !== date2.getFullYear()) return false;
 if (date1.getMonth() !== date2.getMonth()) return false;
 if (date1.getDate() !== date2.getDate()) return false;
 if (date1.getHours() !== date2.getHours()) return false;
 if (date1.getMinutes() !== date2.getMinutes()) return false;
 return true;
}

export function getAllDays(month: Date) {
 const days: Date[] = []
 for (let day = 0; day < new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate(); day++) {
  days.push(new Date(month.getFullYear(), month.getMonth(), day + 1))
 }
 return days
}

export function isAvailableDay(day: Date): boolean {

 const o = new Date()
 o.setHours(0)
 o.setMinutes(0)
 o.setSeconds(0)
 o.setMilliseconds(0)
 o.setDate(o.getDate() + 2)

 if (day < o) return false;
 if (["Sonntag"].includes(day.toLocaleDateString("default", { weekday: "long" }))) return false;
 return true

}

export function isInPast(date: Date) {
 return date <= new Date()
}

export function generateTimespans(start: Date, end: Date, duration: number, pauseDuration: number) {
 const spans = []
 for (let span = start.getTime(); span <= end.getTime() - (duration + pauseDuration); span += (duration + pauseDuration)) {
  if (!isInPast(new Date(span))) spans.push({ start: new Date(span), end: new Date(span + duration) })
 }
 return spans
}

export function overlaps(timespan: any, appointments: any[]) {
 for (let appointmentIndex = 0; appointmentIndex < appointments.length; appointmentIndex++) {
  const appointment = appointments[appointmentIndex];
  if (
   (
    appointment.start >= timespan.start &&
    appointment.start < timespan.end
   ) || (
    appointment.end > timespan.start &&
    appointment.end <= timespan.end
   ) || (
    appointment.start < timespan.start &&
    appointment.end > timespan.end
   )
  ) return true;
 }
 return false;
}