export function backendFetcher<T>(endpoint: string, token? : string): () => Promise<T> {
  return async () => {
    const headers: HeadersInit = {};

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(import.meta.env.VITE_BACKEND_URL + endpoint, {
      headers,
    });

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
  token?: string,
): Promise<Output> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(import.meta.env.VITE_BACKEND_URL + endpoint, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  
  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }
  
  if (response.status === 204 || method === 'DELETE') {
    return undefined as Output;
  }

  return response.json();
}