import TimeAgo from "javascript-time-ago";

// English.
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);

// Create formatter (English).
export const timeAgo = new TimeAgo("en-US");


export function convertTimestampToDate(timestamp: number): Date {
  return new Date(timestamp * 1000);
}

export function formatDate(date: Date): string {
  return date.getDate()  + "-" + (date.getMonth()+1) + "-" + date.getFullYear() + " " +
    date.getHours() + ":" + date.getMinutes();
}
