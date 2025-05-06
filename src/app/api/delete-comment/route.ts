import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function DELETE(request: Request) {
    const res = await request.json()
    const { id} = res
    const result = await prisma.comments.delete({
        where: {id: id}
    })
    return NextResponse.json({result})
}