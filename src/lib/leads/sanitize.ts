const CONTROL_CHARS = /[\u0000-\u001F\u007F]/g;
const MULTI_SPACE = /\s+/g;

export function sanitizeText(value: string, max = 200): string {
  return value.replace(CONTROL_CHARS, "").replace(MULTI_SPACE, " ").trim().slice(0, max);
}

export function sanitizeEmail(value: string): string {
  return sanitizeText(value, 254).toLowerCase();
}

export function sanitizePhone(value?: string): string | undefined {
  if (!value) return undefined;
  const cleaned = value.replace(/[^\d+().\-\s]/g, "").trim();
  return cleaned.length > 0 ? cleaned.slice(0, 40) : undefined;
}

export function hashIdentifier(value: string): string {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash).toString(16);
}
