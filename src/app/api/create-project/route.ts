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
        const { title, description } = res

        const validateError = validateInputs({title, description})
        if (validateError) {
            return validateError
        }
        const result = await prisma.project.create({
            data: {
                title: title,
                description: description,
                published: true,
                author:{
                    connect: {id: session?.user?.id}
                }
            }
        })
        return NextResponse.json({result})
    }
    catch(error) {
        console.error('create-project request failed', error)
        return NextResponse.json({error: 'create-project request failed'}, {status: 500})
    }
} 