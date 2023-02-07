import {convertTimestampToDate, formatDate} from "@/util/datetime";

export class HackerNews {
  by!: string
  descendants!: number
  id!: number
  kids!: number[]
  score!: number
  text!: string
  time!: number
  title!: string
  type!: string

  toArticle(): Article {
    return new Article(this.title, this.by, this.time, this.text);
  }

}

export class Article {
  title!: string
  by!: string
  time!: string
  text!: string

  constructor(title: string, by: string, time: number, text: string) {
    this.title = title;
    this.by = by;
    this.time = formatDate(convertTimestampToDate(time));
    this.text = text;
  }

  getContent(): string {
    return `<div class="text-right pa-8">By ${this.by} on ${this.time}</div><br/><div>${this.text}</div>`;
  }
}
