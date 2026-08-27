type Bucket = {
  count: number;
  resetAt: number;
};

const windows = new Map<string, Bucket>();
const recentSubmissions = new Map<string, number>();

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const DUPLICATE_WINDOW_MS = 10 * 60 * 1000;

function prune(now: number) {
  for (const [key, bucket] of windows) {
    if (bucket.resetAt <= now) windows.delete(key);
  }
  for (const [key, timestamp] of recentSubmissions) {
    if (now - timestamp > DUPLICATE_WINDOW_MS) recentSubmissions.delete(key);
  }
}

export function checkRateLimit(key: string): { ok: true } | { ok: false; retryAfterSec: number } {
  const now = Date.now();
  prune(now);
  const current = windows.get(key);
  if (!current || current.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { ok: true };
  }
  if (current.count >= RATE_LIMIT_MAX) {
    return { ok: false, retryAfterSec: Math.ceil((current.resetAt - now) / 1000) };
  }
  current.count += 1;
  return { ok: true };
}

export function isDuplicateSubmission(emailKey: string): boolean {
  const now = Date.now();
  prune(now);
  const previous = recentSubmissions.get(emailKey);
  if (previous && now - previous < DUPLICATE_WINDOW_MS) return true;
  recentSubmissions.set(emailKey, now);
  return false;
}
