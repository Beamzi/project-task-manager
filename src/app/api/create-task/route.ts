
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { authCheck } from "@/lib/authCheck"
import { validateInputs } from "@/lib/ValidateInputs"

export async function POST(request: Request) {
    try {
        const checkSession = await authCheck()
        if (checkSession instanceof NextResponse) {
            return checkSession
        }
        const session = checkSession
        const res = await request.json()
        const { title, content, date, priority, projectId } = res

        const validationError = validateInputs({title, content})
        if (validationError) {
            return validationError
        }

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
    catch(e) {
        return NextResponse.json({error: 'Failed to Create Task'}, {status: 500})
    }
}

