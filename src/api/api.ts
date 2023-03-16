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


export async function getBase64(url: string) {
  return blobToBase64(await (fetch(url).then(response => response.blob())));
}

function blobToBase64(blob: any): Promise<string> {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const res = reader.result;
      if(typeof res === "string") {
        resolve(res.substring(22));
      } else resolve("");
    };
    reader.readAsDataURL(blob);
  });
}


export async function createUser(email: string, name: string, given_name: string, photo: string) {
  await axios.post("/addUser", { id: email, fullname: name, username: given_name, about: "", school: "", photo });
}

/**
 *     id = data["id"]
    fullname = data["fullname"]
    username = data["username"]
    school = data["school"]
    about = data["about"]
 */

export async function getResults(code: string, level: number): Promise<any> {
  let results: any = [];
  await axios.post("/sendCodeAI",
  { code, level })
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

export async function updateDetails(playerDetails: Player) {
  console.log("calling updateDetails");
  await axios.post("/updateDetails", playerDetails);
}
