import { getPosition, getAstronauts } from "@/api/api";
import {formatDate} from "@/util/datetime";

async function main(): Promise<string> {
  const pos = await getPosition();
  const {date, latitude, longitude} = pos;
  const dateAsString = formatDate(date);
  return `On ${dateAsString}, The ISS was at a latitude of ${latitude} and longitude of ${longitude}.`;
}

export default {
  main, getAstronauts
};
