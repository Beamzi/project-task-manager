import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function DELETE(request: Request) {
    const res = await request.json()
    console.log({res})
    const { id } = res
    const result = await prisma.task.delete({
        where: {id: id}
    })
    return NextResponse.json({result})
}