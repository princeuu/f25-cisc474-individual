export function backendFetcher<T>(endpoint: string): () => Promise<T> {
  return async () => {
    const res = await fetch(import.meta.env.VITE_BACKEND_URL + endpoint);
    if (!res.ok) {
      throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
    }
    return res.json();
  };
}