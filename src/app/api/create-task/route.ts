
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { auth } from "../../../../auth"

export async function POST(request: Request) {
    const res = await request.json()
    const session = await auth()
    const { title, content, date, priority, projectId } = res
    const taskData = {
        data: {
            published: true,
            title: title,
            date: new Date(date),
            content: content,
            priority: priority,
            author: {
                connect: {id: session?.user?.id}
            },
            ...projectId && {project: { connect: {id: projectId}}}
        }
    }

    const result = await prisma.task.create({
        ...taskData
    })
    return NextResponse.json({result})
}