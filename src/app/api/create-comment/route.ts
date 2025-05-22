import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { auth } from "../../../../auth"


export async function POST(request: Request) {
    const session = await auth()
    const res = await request.json()
    const { projectId, content} = res
    const result = await prisma.comments.create({
        data: {
            content: content,
            projectId: projectId,
            authorId: session?.user?.id,
        }
    })
    return NextResponse.json({result})
}