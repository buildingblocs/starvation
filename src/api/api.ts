import {QuotableQuote, Quote} from "@/types/quotes";
import getAPI from "@/util/axios";
import {Player} from "@/types/players";

const random_quotable_url = "https://api.quotable.io/random";

export async function getPlayers(): Promise<Player[]> {
  return (await getAPI().get("/getPlayers")).data;
}

export async function getQuotableQuote(): Promise<QuotableQuote> {
  return await (await fetch(random_quotable_url)).json();
}

export async function getRandomQuotableQuote(): Promise<Quote> {
  const quote = await getQuotableQuote();
  return new Quote(quote.author, quote.content);
}


export async function checkUsername(username: string) {
  return await((await fetch(`/existsUsername?username=${username}`)).json().then(res => res.data.result));
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
        resolve(res); ///.substring(22)
      } else resolve("");
    };
    reader.readAsDataURL(blob);
  });
}

export async function deleteAccount(email: string) {
  await getAPI().post("/deleteUser", { id: email });
}


export async function createUser(email: string, name: string, given_name: string, photo: string) {
  await getAPI().post("/addUser", { id: email, fullname: name, username: given_name, about: "", school: "", photo });
}

/**
 *     id = data["id"]
    fullname = data["fullname"]
    username = data["username"]
    school = data["school"]
    about = data["about"]
 */

class Result {
  details!: Array<any>
  result!: string
  runtime!: number
}

export async function getResults(code: string, level: number, id: string): Promise<any> {
  const resp = await getAPI().post("/sendCodeAI", { code, level, id });
  return resp.data;
}

export async function sendCode(code: string, id: string): Promise<any> {
 await getAPI().post("/sendCode", { code, id });
}

export async function updateDetails(playerDetails: Player) {
  console.log("calling updateDetails");
  await getAPI().post("/updateDetails", playerDetails);
}

export async function checkLoggedIn(): Promise<any> {
  return await getAPI().get("/testLogin", {
    withCredentials:false
    // put the rest of your config here
  });
}

export async function updateResults(id: string, level: string, code: string, winner: boolean): Promise<any> {
  return await getAPI().post("/updateChallenge", {
    id, level: parseInt(level, 10), code, winner
  });
}

export async function getCode(id: string, level: string): Promise<string> {
  return await getAPI().get(`/getChallengeCode?level=${level}&id=${id}`).then(res => res.data.code);
}

export class ChallengeResult {
  level!: number
  lastupdated!: string
  winner!: boolean
}

export async function getChallenges(id: string): Promise<ChallengeResult[]> {
  return await getAPI().get(`/getChallenges/${id}`).then(res => res.data);
}

export async function resolveLogin(code: string): Promise<any> {
  return await getAPI().get("/login/resolver", { params: { code } });
}
