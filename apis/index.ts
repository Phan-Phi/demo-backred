const PREFIX = "api/v2";
const CONTACTS = "api/v2/contacts";

const PRODUCTS_VARIANTS = "api/v2/products/variants";

const PROVINCES = "api/v2/provinces";
const DISTRICTS = "api/v2/provinces/districts";
const WARDS = "api/v2/provinces/districts/wards";

const CART = "api/v2/cart";
const CART_ITEM = "api/v2/cart/items";

const PAGES = "pages";

const generatePathname = (data: string[]): string => {
  const arr = [PREFIX, ...data];
  return `/${arr.join("/")}/`;
};

export const TYPE_PARAMS = {
  "home.HomePage": "home.HomePage",
  "about.AboutPage": "about.AboutPage",

  "news.NewsCategoryListingPage": "news.NewsCategoryListingPage",
  "news.NewsCategoryDetailPage": "news.NewsCategoryDetailPage",
  "news.NewsPage": "news.NewsPage",

  "product.ProductCategoryListingPage": "product.ProductCategoryListingPage",
  "product.ProductCategoryDetailPage": "product.ProductCategoryDetailPage",
  "product.ProductPage": "product.ProductPage",
} as const;

export const SETTING_API = `/${PREFIX}/`;
export const CONTACTS_API = `/${CONTACTS}/`;
export const PROVINCES_API = `/${PROVINCES}/`;
export const DISTRICTS_API = `/${DISTRICTS}/`;
export const WARDS_API = `/${WARDS}/`;
export const CART_API = `/${CART}/`;
export const CART_ITEM_API = `/${CART_ITEM}/`;
export const PRODUCTS_VARIANTS_API = `/${PRODUCTS_VARIANTS}/`;
export const PAGES_API = generatePathname([PAGES]);
