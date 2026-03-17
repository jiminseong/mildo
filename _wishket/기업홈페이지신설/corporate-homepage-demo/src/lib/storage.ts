import type { Inquiry, News, Product } from "@/lib/data";

const PRODUCT_KEY = "corporate_demo_products";
const NEWS_KEY = "corporate_demo_news";
const INQUIRY_KEY = "corporate_demo_inquiries";

function read<T>(key: string, fallback: T): T {
  if (typeof globalThis.window === "undefined") {
    return fallback;
  }

  const raw = globalThis.localStorage.getItem(key);
  if (!raw) {
    return fallback;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  if (typeof globalThis.window === "undefined") {
    return;
  }
  globalThis.localStorage.setItem(key, JSON.stringify(value));
}

export function getProducts(fallback: Product[]): Product[] {
  return read<Product[]>(PRODUCT_KEY, fallback);
}

export function saveProducts(items: Product[]): void {
  write(PRODUCT_KEY, items);
}

export function getNews(fallback: News[]): News[] {
  return read<News[]>(NEWS_KEY, fallback);
}

export function saveNews(items: News[]): void {
  write(NEWS_KEY, items);
}

export function getInquiries(): Inquiry[] {
  return read<Inquiry[]>(INQUIRY_KEY, []);
}

export function saveInquiries(items: Inquiry[]): void {
  write(INQUIRY_KEY, items);
}
