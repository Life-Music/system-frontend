export const convertDuration = (durationSec: number): string => {
  const hour = Math.floor(durationSec / 60 / 60);
  const minute = Math.floor(durationSec / 60);
  const second = Math.floor(durationSec % 60);
  const hourStr = `${hour < 10 ? '0' + hour : hour}`
  const minuteStr = `${minute < 10 ? '0' + minute : minute}`
  const secondStr = `${second < 10 ? '0' + second : second}`
  if (hour) {
    return `${hourStr}:${minuteStr}:${secondStr}`
  }
  return `${minuteStr}:${secondStr}`

}