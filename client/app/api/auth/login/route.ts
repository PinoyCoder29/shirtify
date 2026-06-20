import { generateToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required!",
        },
        {
          status: 400,
        },
      );
    }
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Credintials",
        },
        {
          status: 400,
        },
      );
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Credintials",
        },
        {
          status: 400,
        },
      );
    }
    const token = generateToken({ id: user.id, email: user.email });

    return NextResponse.json(
      {
        success: true,
        message: "Login Successful",
        token,
        user: {
          user: user.id,
          email: user.email,
        },
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
