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
        const { projectId, content} = res

        const validateError = validateInputs({content})
        if (validateError) {
            return validateError
        }
    const result = await prisma.comments.create({
        data: {
            content: content,
            projectId: projectId,
            authorId: session?.user?.id,
        }
    })
    return NextResponse.json({result})
    }
    catch(error) {
        console.error('create-comment request failed', error)
        return NextResponse.json({error: 'create-comment request failed'}, {status: 500})
    }

}