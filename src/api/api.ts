import {Location, Position} from "@/types/position";
import {JokeCollection} from "@/types/jokes";
import {InspirationalQuote, QuotableQuote, QuotableQuoteCollection, Quote} from "@/types/quotes";
import {range} from "@/util/arrays";
import {AstronautCollection} from "@/types/astronauts";
import {Article, HackerNews} from "@/types/hackernews";
import {Repo, User } from "@/types/github";

const iss_url = "http://api.open-notify.org/iss-now.json";
const joke_url = "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single&amount=10";
const astro_url = "http://api.open-notify.org/astros.json";
const random_quotable_url = "https://api.quotable.io/random";
const quotable_url = "https://api.quotable.io/quotes?page=";
const top_stories_url = "https://hacker-news.firebaseio.com/v0/topstories.json";
const hacker_news_url = "https://hacker-news.firebaseio.com/v0/item/";
const inspiration_url = "https://inspiration.goprogram.ai/";

async function getLocation(): Promise<Location> {
  return await (await fetch(iss_url)).json();
}

export async function getPosition(): Promise<Position> {
  const loc: Location = await getLocation();
  return new Position(loc.timestamp, loc.iss_position);
}

async function getJokeData(): Promise<JokeCollection> {
  return await (await fetch(joke_url)).json();
}

async function getJokeDataWithPrompt(prompt: string): Promise<JokeCollection> {
  return await (await fetch(`https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single&contains=${prompt}`)).json();
}

export async function getJokes(): Promise<string[]> {
  const jokeData = await getJokeData();
  return jokeData.jokes.map(it => it.joke);
}

export async function getJokesWithPrompt(prompt: string): Promise<string[]> {
  const jokeData = await getJokeDataWithPrompt(prompt);
  return jokeData.jokes.map(it => it.joke);
}

async function getAstroData(): Promise<AstronautCollection> {
  return await (await fetch(astro_url)).json();
}

export async function getAstronauts(): Promise<string[]> {
  const astroData = await getAstroData();
  return astroData.people.map(it => it.name);
}

export async function getQuotableQuote(): Promise<QuotableQuote> {
  return await (await fetch(random_quotable_url)).json();
}

export async function getRandomQuotableQuote(): Promise<Quote> {
  const quote = await getQuotableQuote();
  return new Quote(quote.author, quote.content);
}

export async function getQuotableQuoteCollection(page: number): Promise<QuotableQuoteCollection> {
  return await (await fetch(quotable_url+`${page}`)).json();
}

export async function getQuotableQuotes(page: number): Promise<QuotableQuote[]> {
  const collection = await getQuotableQuoteCollection(page);
  return collection.results;
}

export async function getAllQuotableQuotes(): Promise<Quote[]> {
  let arr = Array<Quote>();
  for(const page of range(1, 96)) {
    arr = arr.concat((await getQuotableQuotes(page)).map(it => new Quote(it.author, it.content)));
  }
  return arr;
}

export async function getTopStories(): Promise<number[]> {
  return await (await fetch(top_stories_url)).json();
}

export async function getHackerNews(item: number): Promise<HackerNews> {
  return await (await fetch(hacker_news_url+`${item}.json`)).json();
}

export async function getAllTopStories(): Promise<Article[]> {
  const topStories = await getTopStories();
  const arr = Array<HackerNews>();
  for(const index of topStories) {
    arr.push(await getHackerNews(index));
  }
  return arr.map(it => new Article(it.title, it.by, it.time, it.text));
}

export async function getInspirationalQuote(): Promise<InspirationalQuote> {
  return await (await fetch(inspiration_url)).json();
}

export async function getUser(username: string): Promise<User> {
  return await (await fetch(
    "https://api.github.com/users/" + username)).json();
}

export async function getRepos(username: string): Promise<Repo[]> {
  return await (await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100`)).json();
}

