export function backendFetcher<T>(endpoint: string): () => Promise<T> {
  return async () => {
    const res = await fetch(import.meta.env.VITE_BACKEND_URL + endpoint);
    if (!res.ok) {
      throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
    }
    return res.json();
  };
}

export async function backendMutate<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(import.meta.env.VITE_BACKEND_URL + endpoint, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  
  if (!res.ok) {
    throw new Error(`Mutation failed: ${res.status} ${res.statusText}`);
  }
  
  // DELETE might not return JSON
  if (res.status === 204 || options.method === 'DELETE') {
    return undefined as T;
  }
  
  return res.json();
}