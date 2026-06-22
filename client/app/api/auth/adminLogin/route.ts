import { generateToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "all fields are required!",
        },
        {
          status: 400,
        },
      );
    }
    const admin = await prisma.admin.findUnique({
      where: {
        email,
      },
    });
    if (!admin) {
      return NextResponse.json({
        success: false,
        message: "Invalid email or password please try again!.",
      });
    }
    if (password !== admin.password) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password please try again!.",
        },
        {
          status: 400,
        },
      );
    }
    const token = generateToken({ id: admin.id, email: admin.email });

    return NextResponse.json({
      success: true,
      message: "Login Successfully!.",
      token,
      admin: {
        id: admin.id,
        email: admin.email,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "server error",
      },
      {
        status: 400,
      },
    );
  }
}
