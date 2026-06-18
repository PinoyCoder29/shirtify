import { hashPassword } from "@/lib/hash";
import { sentOtp } from "@/lib/nodemailer";
import { generateOtp } from "@/lib/otp";
import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { fullName, email, password } = await req.json();

    if (!fullName || !email || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required!" },
        { status: 400 },
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    const existingUser = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email already registered!" },
        { status: 400 },
      );
    }

    const hashedPassword = await hashPassword(password);
    const otp = String(generateOtp());

    // 🔥 STORE USER TEMP DATA (STRING)
    await redis.set(
      `register:${cleanEmail}`,
      JSON.stringify({
        fullName,
        email: cleanEmail,
        password: hashedPassword,
      }),
      { ex: 300 },
    );

    // 🔥 STORE OTP (STRING)
    await redis.set(`otp:${cleanEmail}`, otp, { ex: 300 });

    await sentOtp(cleanEmail, otp);

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully",
      otp,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
