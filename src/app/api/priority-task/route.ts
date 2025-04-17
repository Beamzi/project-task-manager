import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
    const res = await request.json()

    const { priority, id } = res

    const result = await prisma.task.update({
        where: {id: id},
        data: {
            priority: priority
        }
    })
    return NextResponse.json({ result })


}