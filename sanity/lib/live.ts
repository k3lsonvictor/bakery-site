import 'server-only'

import { client } from './client'

export async function sanityFetch<T>({query}: {query: string}): Promise<{data: T}> {
  const token = process.env.SANITY_API_READ_TOKEN

  if (!token) {
    throw new Error('Missing environment variable: SANITY_API_READ_TOKEN')
  }

  const data = await client.withConfig({token}).fetch<T>(query)
  return {data}
}
