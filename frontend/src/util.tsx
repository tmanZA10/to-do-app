
export function setMaxTime(date: Date){
  const newDate = new Date(date);
  newDate.setHours(23)
  newDate.setMinutes(59)
  newDate.setSeconds(59)
  newDate.setMilliseconds(999)
  return newDate
}

export function setMinTime(date: Date){
  const newDate = new Date(date);
  newDate.setHours(0)
  newDate.setMinutes(0)
  newDate.setSeconds(0)
  newDate.setMilliseconds(0)
  return newDate
}