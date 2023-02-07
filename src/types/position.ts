import {convertTimestampToDate} from "@/util/datetime";

export class Coordinates {
  latitude!: string
  longitude!: string
}

export class Location {
  timestamp!: number
  message!: string
  iss_position!: Coordinates
}

export class Position {
  date!: Date
  latitude!: string
  longitude!: string

  constructor(unix_timestamp: number, coordinates: Coordinates) {
    this.date = convertTimestampToDate(unix_timestamp);
    const { latitude, longitude } = coordinates;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
