export class QuotableQuote {
  _id!: string
  author!: string
  authorSlug!: string
  content!: string
  length!: number
  tags!: string[]

  toQuote(): Quote {
    return new Quote(this.author, this.content);
  }
}

export class Quote {
  author!: string
  content!: string

  constructor(author: string, content: string) {
    this.author = author;
    this.content  = content;
  }
}
