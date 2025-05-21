import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "../../../../auth"

export async function POST(request: Request) {
    const session = await auth()

    const res = await request.json()

    console.log({res})

    const { taskId, projectId} = res

    const result = await prisma.task.update({
        where: {id: taskId, author: {id: session?.user?.id}},
        data: {
            project: {
                connect: {id: projectId}
            }
        }
    })

    return NextResponse.json({result})
}
