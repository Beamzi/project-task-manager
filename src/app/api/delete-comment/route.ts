import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { auth } from "../../../../auth"

export async function DELETE(request: Request) {
    const session = await auth()
    const res = await request.json()
    const { id } = res
    const result = await prisma.comments.delete({
        where: {id: id, author: {id: session?.user?.id}}
    })
    return NextResponse.json({result})
}