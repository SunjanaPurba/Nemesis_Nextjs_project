import { headers } from "next/headers";

function normalizeBaseUrl(url) {
  if (!url || typeof url !== "string") return "http://localhost:3000";
  const trimmed = url.trim().replace(/\/+$/, ""); 
  return trimmed || "http://localhost:3000";
}

export async function getBaseUrl() {
  const fromEnv = process.env.NEXTAUTH_URL
    || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null);
  if (fromEnv) {
    const url = normalizeBaseUrl(fromEnv);
    try {
      new URL(url);
      return url;
    } catch {}
  }

  try {
    const headersList = await headers();
    const host = headersList.get("host") || headersList.get("x-forwarded-host") || "localhost:3000";
    const proto = headersList.get("x-forwarded-proto") || "http";
    const url = normalizeBaseUrl(`${proto}://${host}`);
    new URL(url);
    return url;
  } catch {
    return "http://localhost:3000";
  }
}
