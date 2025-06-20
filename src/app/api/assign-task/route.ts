import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { authCheck } from "@/lib/authCheck"

export async function POST(request: Request) {
    try {
        const sessionCheck = await authCheck()
        if (sessionCheck instanceof NextResponse) {
            return sessionCheck
        }
        const session = sessionCheck
        const res = await request.json()
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
    catch(error) {
        console.error('assign-task request failed', error)
        return NextResponse.json({error: 'assign-task request failed'}, {status: 500})
    }
}
