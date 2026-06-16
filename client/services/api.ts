export async function apiPost(url: string, data: any) {
  const response = await fetch(`/api${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}
