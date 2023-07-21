import { InferType, boolean, mixed, number, object, string } from "yup";

const BLOCK_TYPE_EMAIL = object({
  block_type: string().oneOf(["email"]).required(),
  value: string().required(),
});

const BLOCK_TYPE_SOCIAL_ICON = object({
  block_type: string().oneOf(["social_icon"]).required(),
  value: object({
    icon: string().required(),
    link: string().required(),
  }),
});
const BLOCK_TYPE_ECOM_ICON = object({
  block_type: string().oneOf(["ecom_icon"]).required(),
  value: object({
    icon: string().required(),
    link: string().required(),
  }),
});

const CONTACT_ICON = object({
  block_type: string().oneOf(["contact_icon"]).required(),
  value: string().required(),
});

const BLOCK_TYPE_HOTLINES = object({
  block_type: string().oneOf(["hotline"]).required(),
  value: string().required(),
});

const BLOCK_TYPE_WORKING_TIME = object({
  block_type: string().oneOf(["working_time"]).required(),
  value: string().required(),
});

const BLOCK_TYPE_IMAGE = object({
  block_type: string().oneOf(["image"]).required(),
  value: string().required(),
});

const BLOCK_TYPE_CONTENT = object({
  block_type: string().oneOf(["content"]).required(),
  value: string().required(),
});

const BLOCK_TYPE_DOCUMENT = object({
  block_type: string().oneOf(["document"]).required(),
  value: object({
    title: string().required(),
    image: string().required(),
  }),
});

const BLOCK_TYPE_EMBED = object({
  block_type: string().oneOf(["embed"]).required(),
  value: object({
    width: string().required(),
    height: string().required(),
    src: string().required(),
  }),
});

const BLOCK_TYPE_SEARCH_BAR_PLACEHOLDER = object({
  block_type: string().oneOf(["placeholder"]).required(),
  value: string().required(),
});

const PARENT_ITEM = object({
  id: number().required(),
  meta: object({
    type: string().required(),
    detail_url: string().required(),
    html_url: string().required().nullable(),
  }),
  title: string().required(),
});

const META_ITEM = object({
  type: string().required(),
  detail_url: string().required(),
  show_in_menus: boolean().required(),
  url_path: string().required(),
  slug: string().required(),
  seo_title: string().required(),
  first_published_at: string().required(),
  parent: PARENT_ITEM,
  locale: string().required(),
  alias_of: mixed(),
});

const META_ITEM_NEWS = object({
  type: string().required(),
  detail_url: string().required(),
  html_url: mixed(),
  show_in_menus: boolean().required(),
  url_path: string().required(),
  slug: string().required(),
  first_published_at: string().required(),
  parent: PARENT_ITEM,
  locale: string().required(),
  alias_of: mixed(),
});

const META_ITEM_PRODUCT = object({
  type: string().required(),
  detail_url: string().required(),
  html_url: string().nullable(),
  slug: string().required(),
  first_published_at: string().required(),
  locale: string().required(),
});

export {
  BLOCK_TYPE_EMAIL,
  BLOCK_TYPE_SOCIAL_ICON,
  CONTACT_ICON,
  BLOCK_TYPE_WORKING_TIME,
  BLOCK_TYPE_HOTLINES,
  META_ITEM,
  PARENT_ITEM,
  BLOCK_TYPE_CONTENT,
  BLOCK_TYPE_IMAGE,
  BLOCK_TYPE_DOCUMENT,
  BLOCK_TYPE_EMBED,
  META_ITEM_PRODUCT,
  META_ITEM_NEWS,
  BLOCK_TYPE_SEARCH_BAR_PLACEHOLDER,
  BLOCK_TYPE_ECOM_ICON,
};

export type BlockTypeEmail = InferType<typeof BLOCK_TYPE_EMAIL>;
export type BlockTypeSocialIcon = InferType<typeof BLOCK_TYPE_SOCIAL_ICON>;
export type BlockTypeContactIcon = InferType<typeof CONTACT_ICON>;
export type BlockTypeHotlines = InferType<typeof BLOCK_TYPE_HOTLINES>;
export type BlockTypeWorkingTime = InferType<typeof BLOCK_TYPE_WORKING_TIME>;
export type BlockTypeImage = InferType<typeof BLOCK_TYPE_IMAGE>;
export type BlockTypeContent = InferType<typeof BLOCK_TYPE_CONTENT>;
export type BlockTypeDocument = InferType<typeof BLOCK_TYPE_DOCUMENT>;
export type BlockTypeEmbed = InferType<typeof BLOCK_TYPE_EMBED>;
export type BlockTypeSearchPlaceholder = InferType<
  typeof BLOCK_TYPE_SEARCH_BAR_PLACEHOLDER
>;
export type BlockTypeEcomIcon = InferType<typeof BLOCK_TYPE_ECOM_ICON>;
