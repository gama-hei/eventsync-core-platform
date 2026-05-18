import { Event, Session } from "@/types";

const API_BASE_URL = "http://localhost:8080"

export async function getEvents() {
  await new Promise((resolve) =>
    setTimeout(resolve, 3000)
  );

  const res = await fetch(`${API_BASE_URL}/events`, {
    cache: "no-store",
  });

  return res.json();
}

export async function getLiveSessions(): Promise<Session[]> {
  const res = await fetch(`${API_BASE_URL}/sessions/live`, {
    next: {
      revalidate: 30,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch live sessions");
  }

  return res.json();
}
