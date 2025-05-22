import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "../../../../auth"

export async function POST(request: Request) {
    const session = await auth()
    const res = await request.json()
    const { priority, id } = res
    const result = await prisma.task.update({
        where: {id: id, author: {id: session?.user?.id}},
        data: {
            priority: priority
        }
    })
    return NextResponse.json({ result })


}