
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { auth } from "../../../../auth"

export async function POST(request: Request) {
    const res = await request.json()
    const session = await auth()

    const { title, content, date, projectId } = res
    if (projectId !== undefined) {
    const result = await prisma.task.create({
        data: {
            published: true,
            title: title,
            date: new Date(date),
            content: content,
            author: {
                connect: {id: session?.user?.id}
            },
            project: {
                connect: {id: projectId}
            }
        }
    })
    return NextResponse.json({result})
    }
    else {
        const result = await prisma.task.create({
        data: {
            published: true,
            title: title,
            date: new Date(date),
            content: content,
            author: {
                connect: {id: session?.user?.id}
            },
        }
    })
    return NextResponse.json({result})
    }

}