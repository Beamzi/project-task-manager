import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { authCheck } from "@/lib/authCheck"
import { validateInputs } from "@/lib/ValidateInputs"

export async function POST(request: Request) {
    try {
        const sessionCheck = await authCheck()
        if (sessionCheck instanceof NextResponse) {
            return sessionCheck
        }
        const session = sessionCheck
        const res = await request.json()
        const { title, content, id, date } = res

        const validateError = validateInputs({title, content, date})
        if (validateError) {
            return validateError
        }
        const result = await prisma.task.update({
            where: {id: id, author: {id: session?.user?.id} },
            data: {
                title: title,
                content: content,
                date: new Date(date)
            }
        })
        return NextResponse.json({result})
    }
    catch(error) {
        console.error('update-task request failed', error)
        return NextResponse.json({error: 'update-task request failed'}, {status: 500})
    }
}