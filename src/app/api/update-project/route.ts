
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authCheck } from "@/lib/authCheck";
import { validateInputs } from "@/lib/ValidateInputs";

export async function POST(request: Request) {
    try {
        const sessionCheck = await authCheck()
        if (sessionCheck instanceof NextResponse) {
            return sessionCheck
        }
        const session = sessionCheck
        const res = await request.json()
        const { id, title, description } = res

        const validateError = validateInputs({title, description})
        if (validateError) {
            return validateError
        }
        const result = await prisma.project.update({
            where: {id: id, author: {id: session?.user?.id}},
            data: {
                title: title,
                description: description
            }
        })
        return NextResponse.json({result})
    }
    catch(error) {
        console.error('update-project request failed', error)
        return NextResponse.json({error: 'update-project request failed'}, {status: 500})
    }
}