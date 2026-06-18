import { apiPost } from "./api";

export function register(data: {
  fullName: string;
  email: string;
  password: string;
}) {
  return apiPost("/auth/register", data);
}

export function verifyOtp(data: { email: string; otp: string }) {
  return apiPost("/auth/verify-otp", data);
}
