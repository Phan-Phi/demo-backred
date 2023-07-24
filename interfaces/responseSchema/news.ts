import { object, number, string, array, InferType, mixed, boolean } from "yup";

import { BLOCK_TYPE_IMAGE, META_ITEM, META_ITEM_NEWS } from "./utils";

export let newsListingPageSchema = object({
  id: number().required().positive().integer(),
  meta: META_ITEM_NEWS,
  title: string().required(),
  last_published_at: string().required(),
  banner: string().required(),
});

export let newsPagePageSchema = object({
  id: number().required().positive().integer(),
  meta: META_ITEM_NEWS,
  title: string().required(),
  last_published_at: string().required(),
  banner: string().required(),
  thumbnail: mixed(),
  description: string().required(),
  content: mixed(),
  is_on_footer: boolean().required(),
});

export let newsDetailPageSchema = object({
  id: number().required().positive().integer(),
  meta: META_ITEM_NEWS,
  title: string().required(),
  last_published_at: string().required(),
  banner: string().required(),
});

export type NewsPage = InferType<typeof newsPagePageSchema>;
export type NewsDetailPage = InferType<typeof newsDetailPageSchema>;
export type NewsListingPage = InferType<typeof newsListingPageSchema>;
