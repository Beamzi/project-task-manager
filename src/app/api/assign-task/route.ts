import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
    const res = await request.json()

    console.log({res})

    const { taskId, projectId} = res

    const result = await prisma.task.update({
        where: {id: taskId},
        data: {
            project: {
                connect: {id: projectId}
            }
        }
    })

    return NextResponse.json({result})
}
