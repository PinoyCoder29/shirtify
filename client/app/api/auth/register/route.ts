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
        {
          success: false,
          messsage: "All fields are required!",
        },
        {
          status: 400,
        },
      );
    }
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "email already registered!",
        },
        {
          status: 400,
        },
      );
    }
    const hashedPassword = await hashPassword(password);

    const otp = generateOtp();
    await redis.set(
      `register: ${email}`,
      JSON.stringify({
        fullName,
        email,
        password: hashedPassword,
      }),
      {
        ex: 300,
      },
    );
    await redis.set(`otp: ${email}`, otp, {
      ex: 300,
    });
    await sentOtp(email, otp);

    return NextResponse.json({
      success: true,

      message: "Otp send Successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Server error",
      },
      {
        status: 400,
      },
    );
  }
}
