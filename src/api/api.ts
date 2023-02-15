import {QuotableQuote, Quote} from "@/types/quotes";

const random_quotable_url = "https://api.quotable.io/random";


export async function getQuotableQuote(): Promise<QuotableQuote> {
  return await (await fetch(random_quotable_url)).json();
}

export async function getRandomQuotableQuote(): Promise<Quote> {
  const quote = await getQuotableQuote();
  return new Quote(quote.author, quote.content);
}
