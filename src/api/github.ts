import {getRepos, getUser} from "@/api/api";
import { Repo } from "@/types/github";

async function main(name: string): Promise<Repo[]> {
  const user = await getUser(name);
  const repos = await getRepos(name);
  // const starredRepos = repos.filter(repo => {
  //   return repo.stargazers_count > 0;
  // });
  // const repoNames = repos.map(repo => repo.name)
  //   .join(", ");


  return repos.filter(repo => {
    return !repo.fork && repo.language
  });
}

export default {
  main
};
