export class Flags {
  nsfw!: boolean
  religious!: boolean
  political!: boolean
  racist!: boolean
  sexist!: boolean
  explicit!: boolean
}

export class Joke {
  category!: string
  type!: string
  joke!: string
  flags!: Flags
  id!: number
  safe!: boolean
  lang!: string
}

export class JokeCollection {
  error!: boolean
  amount!: number
  jokes!: Joke[]
}
