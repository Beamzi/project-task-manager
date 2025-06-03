
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const res = await request.json() 
    const { id } = res
    const result = await prisma.comments.findUnique({
        where: {id: id}
    })
    return NextResponse.json({result})

}