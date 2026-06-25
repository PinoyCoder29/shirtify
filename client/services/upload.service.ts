import { apiPost } from "./api";

export function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  return apiPost("/upload", formData);
}
