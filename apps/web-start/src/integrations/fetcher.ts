export const backendFetcher =
  <T>(path: string, init?: RequestInit) =>
    async (): Promise<T> => {
      const isServer = typeof window === 'undefined' || import.meta.env.SSR;
      const base = isServer
        ? process.env.API_URL || 'http://localhost:3001' // backend in dev
        : ''; // client uses Vite proxy

      const url = `${base}${path.startsWith('/') ? path : `/${path}`}`;

      const res = await fetch(url, {
        ...init,
        headers: { Accept: 'application/json', ...(init?.headers || {}) },
      });
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`Fetch ${url} failed: ${res.status} ${res.statusText} ${text.slice(0, 120)}…`);
      }
      return res.json() as Promise<T>;
    };

export async function mutateBackend<T>(
  endpoint: string,
  method: string,
  body?: any,
): Promise<T> {
  const response = await fetch(import.meta.env.VITE_BACKEND_URL + endpoint, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}