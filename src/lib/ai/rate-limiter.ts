// A simple in-memory rate limiter for demonstration purposes.
// In a true production environment deployed to Edge functions, use Upstash Redis.

interface RateLimitStore {
  count: number;
  resetTime: number;
}

const store = new Map<string, RateLimitStore>();

// Limit: 10 requests per minute per IP
const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 10;

export function checkRateLimit(ip: string): { success: boolean; limit: number; remaining: number } {
  const now = Date.now();
  const record = store.get(ip);

  if (!record || now > record.resetTime) {
    // New IP or window expired
    store.set(ip, {
      count: 1,
      resetTime: now + WINDOW_MS,
    });
    return { success: true, limit: MAX_REQUESTS, remaining: MAX_REQUESTS - 1 };
  }

  if (record.count >= MAX_REQUESTS) {
    return { success: false, limit: MAX_REQUESTS, remaining: 0 };
  }

  record.count += 1;
  store.set(ip, record);

  return { success: true, limit: MAX_REQUESTS, remaining: MAX_REQUESTS - record.count };
}
