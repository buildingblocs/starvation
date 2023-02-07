export function convertTimestampToDate(timestamp: number): Date {
  return new Date(timestamp * 1000);
}

export function formatDate(date: Date): string {
  return date.getDate()  + "-" + (date.getMonth()+1) + "-" + date.getFullYear() + " " +
    date.getHours() + ":" + date.getMinutes();
}
