import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = await request.json();
  const { id, content } = res;

  const result = await prisma.comments.update({
    where: { id: id },
    data: {
      content: content,
    },
  });
  return NextResponse.json({ result });
}
