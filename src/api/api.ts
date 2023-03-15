import {QuotableQuote, Quote} from "@/types/quotes";
import axios from "axios";
import {Player} from "@/types/players";

const random_quotable_url = "https://api.quotable.io/random";

export async function getPlayers(): Promise<Player[]> {
  return await (await fetch("/getPlayers")).json();
}

export async function getQuotableQuote(): Promise<QuotableQuote> {
  return await (await fetch(random_quotable_url)).json();
}

export async function getRandomQuotableQuote(): Promise<Quote> {
  const quote = await getQuotableQuote();
  return new Quote(quote.author, quote.content);
}


export async function getResults(code: string): Promise<any> {
  let results: any = [];
  await axios.post("/sendCodeAI",
  { code })
  .then(res => {
    results = res.data.output;
    console.log(results);
  },
  res => {
    console.log("error");
  })
  .catch(err => {
    console.log(err);
  });
  return results;
}
