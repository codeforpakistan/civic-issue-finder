import { headers } from 'next/headers'
import { LRUCache } from 'lru-cache'

const ratelimit = new LRUCache({
  max: 500,
  ttl: 60 * 1000, // 1 minute
})

export async function rateLimit(request: Request) {
  console.log(request.headers)
  const ip = headers().get('x-forwarded-for') ?? 'anonymous'
  const tokenCount = ratelimit.get(ip) as number || 0
  
  if (tokenCount > 20) {
    return { success: false }
  }

  ratelimit.set(ip, tokenCount + 1)
  return { success: true }
} 