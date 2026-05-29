const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let message = res.statusText;
    try {
      const data = await res.json();
      message = (data as any)?.detail || message;
    } catch (_) {
      /* ignore */
    }
    throw new Error(message || "Request failed");
  }
  return res.json() as Promise<T>;
}

export async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${apiBase}${path}`);
  return handleResponse<T>(res);
}

export async function uploadFile(form: FormData): Promise<{ report_id: number }> {
  const res = await fetch(`${apiBase}/upload`, { method: "POST", body: form });
  return handleResponse<{ report_id: number }>(res);
}

export { apiBase };
