import {defineQuery} from 'next-sanity'

import type {Product, WeeklyHighlight} from '@/lib/products'
import {sanityFetch} from './live'

export const PRODUCTS_QUERY = defineQuery(/* groq */ `
  *[
    _type == "product" &&
    defined(name) &&
    defined(price)
  ] | order(category asc, name asc) {
    "id": _id,
    name,
    "detail": coalesce(description, ""),
    price,
    "category": coalesce(category, "Pães"),
    "imageUrl": image.asset->url,
    "imageAlt": image.alt
  }
`)

export const WEEKLY_HIGHLIGHT_QUERY = defineQuery(/* groq */ `
  *[_id == "weeklyHighlight"][0] {
    headline,
    "description": coalesce(description, product->description, ""),
    rating,
    reviewCount,
    "imageUrl": coalesce(image.asset->url, product->image.asset->url),
    "imageAlt": coalesce(image.alt, product->image.alt, product->name),
    "product": product->{
      "id": _id,
      name,
      "detail": coalesce(description, ""),
      price,
      "category": coalesce(category, "Pães"),
      "imageUrl": image.asset->url,
      "imageAlt": image.alt
    }
  }
`)

export async function getProducts(): Promise<Product[]> {
  const {data} = await sanityFetch<Product[]>({query: PRODUCTS_QUERY})
  return data
}

export async function getWeeklyHighlight(): Promise<WeeklyHighlight | null> {
  const {data} = await sanityFetch<WeeklyHighlight | null>({
    query: WEEKLY_HIGHLIGHT_QUERY,
  })
  return data
}
