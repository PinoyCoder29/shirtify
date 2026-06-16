import { apiPost } from "./api";

export function register(data: {
  fullName: string;
  email: string;
  password: string;
}) {
  return apiPost("/auth/register", data);
}
