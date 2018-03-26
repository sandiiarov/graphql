// @flow

// this is fetched from "/categories/:id" endpoint
export type RawFAQArticleItem = {
  url: string,
  title: string,
  perex: string,
  upvotes: number,
  downvotes: number,
};

export type SanitizedFAQArticleItem = RawFAQArticleItem & {
  id: string,
  language: string,
};

// this is fetched from "/articles/:id" endpoint
export type FAQArticleDetail = {
  id: number,
  content: string,
  title: string,
  perex: string,
  upvotes: number,
  downvotes: number,
};

export type FAQArticleResponse = SanitizedFAQArticleItem & FAQArticleDetail;
