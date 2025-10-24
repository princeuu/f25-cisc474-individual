export function backendFetcher<T>(endpoint: string): () => Promise<T> {
  return async () => {
    const res = await fetch(import.meta.env.VITE_BACKEND_URL + endpoint);
    if (!res.ok) {
      throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
    }
    return res.json();
  };
}

export async function mutateBackend<Input, Output>(
  endpoint: string,
  method: string,
  body?: Input,
): Promise<Output> {
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
  
  // Handle DELETE or 204 No Content
  if (response.status === 204 || method === 'DELETE') {
    return undefined as Output;
  }

  return response.json();
}