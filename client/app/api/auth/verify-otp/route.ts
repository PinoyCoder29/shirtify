import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { success: false, message: "Email and OTP required" },
        { status: 400 },
      );  
    }

    const cleanEmail = email.toLowerCase().trim();

    const storedOtp = await redis.get(`otp:${cleanEmail}`);
    const pendingUser = await redis.get(`register:${cleanEmail}`);

    console.log("STORED OTP:", storedOtp);
    console.log("PENDING USER:", pendingUser);

    // ❌ missing data
    if (!storedOtp || !pendingUser) {
      return NextResponse.json(
        { success: false, message: "OTP expired or invalid request" },
        { status: 400 },
      );
    }

    // ❌ wrong OTP
    if (String(storedOtp).trim() !== String(otp).trim()) {
      return NextResponse.json(
        { success: false, message: "Invalid OTP" },
        { status: 400 },
      );
    }

    let userData;
    try {
      userData =
        typeof pendingUser === "string" ? JSON.parse(pendingUser) : pendingUser;
    } catch {
      return NextResponse.json(
        { success: false, message: "Corrupted user data" },
        { status: 400 },
      );
    }

    // 🧠 create user in DB
    const user = await prisma.user.create({
      data: {
        fullName: userData.fullName,
        email: userData.email,
        password: userData.password,
      },
    });

    // 🧹 cleanup redis
    await redis.del(`otp:${cleanEmail}`);
    await redis.del(`register:${cleanEmail}`);

    return NextResponse.json(
      {
        success: true,
        message: "Account verified successfully",
        user,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("VERIFY ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
