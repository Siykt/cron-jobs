/**
 * 格式化时间
 * @param timeOrDate 时间戳或Date对象
 * @param formatStr 格式化字符串支持 YYYY MM DD hh mm ss
 */
export function formatTime(timeOrDate: number | Date, formatStr = 'YYYY-MM-DD hh:mm:ss') {
  let date: Date
  if (timeOrDate instanceof Date)
    date = timeOrDate
  else
    date = new Date(timeOrDate.toString().length === 10 ? timeOrDate * 1000 : timeOrDate)

  if (date.toString() === 'Invalid Date')
    return 'Invalid Date'

  const padStart = (num: number, maxLength = 2) => num.toString().padStart(maxLength, '0')

  const matches: { [x: string]: string } = {
    YYYY: padStart(date.getFullYear(), 4),
    MM: padStart(date.getMonth() + 1),
    DD: padStart(date.getDate()),
    hh: padStart(date.getHours()),
    mm: padStart(date.getMinutes()),
    ss: padStart(date.getSeconds()),
  }
  return formatStr.replace(/\[([^\]]+)]|Y{4}|MM|DD|hh|mm|ss/g, (match, $1) => $1 || matches[match] || '')
}
