import TimeAgo from "javascript-time-ago";

// English.
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);

// Create formatter (English).
export const timeAgo = new TimeAgo("en-US");


export function convertSQLTimestampToDate(timestamp: string): Date {
  // Split timestamp into [ Y, M, D, h, m, s ]
  console.log(timestamp);
  const t: Array<number> = timestamp.split(/[T:-]+/g).map(it => parseInt(it));
  return new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
}

export function convertTimestampToDate(timestamp: number): Date {
  return new Date(timestamp * 1000);
}

export function formatDate(date: Date): string {
  return date.getDate()  + "-" + (date.getMonth()+1) + "-" + date.getFullYear() + " " +
    date.getHours() + ":" + date.getMinutes();
}
