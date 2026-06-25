export async function apiPost(url: string, data: any) {
  const isFormData = data instanceof FormData;

  const response = await fetch(`/api${url}`, {
    method: "POST",

    headers: isFormData ? undefined : { "Content-Type": "application/json" },

    body: isFormData ? data : JSON.stringify(data),
  });

  return response.json();
}
