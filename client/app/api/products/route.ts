import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const product = await prisma.product.findMany({
      include: {
        variants: true,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      {
        mesage: "failed to fetch the product!",
      },
      { status: 400 },
    );
  }
}
