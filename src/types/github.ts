export class User {
  login!: string
  id!: number
  public_repos!: number
  followers!: number
}

export class Repo {
  name!: string
  watchers_count!: number
  stargazers_count!: number
  description!: string
  language!: string
  fork!: boolean
}
