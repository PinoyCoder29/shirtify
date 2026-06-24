import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, description, price, category, images, variants } =
      await req.json();

    if (!name || !price) {
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
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        category,
        images,

        variants: {
          create: variants.map((v: any) => ({
            size: v.size,
            stock: v.stock,
          })),
        },
      },
    });
  } catch (error) {}
}
