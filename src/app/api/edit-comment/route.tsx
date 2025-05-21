import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "../../../../auth";

export async function POST(request: Request) {
  const session = await auth();

  const res = await request.json();
  const { id, content } = res;

  const result = await prisma.comments.update({
    where: { id: id, author: { id: session?.user?.id } },
    data: {
      content: content,
    },
  });
  return NextResponse.json({ result });
}
