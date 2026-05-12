export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const fetcher = (url: string) => fetch(url).then((res) => res.json());
