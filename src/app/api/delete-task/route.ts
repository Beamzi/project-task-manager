import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { authCheck } from "@/lib/authCheck"


export async function DELETE(request: Request) {
    try {
        const sessionCheck = await authCheck()
        if (sessionCheck instanceof NextResponse){
            return sessionCheck
        }

        const session = sessionCheck
        const res = await request.json()
        const { id } = res

        const result = await prisma.task.delete({
            where: {id: id, author: {id: session?.user?.id}}
        })
        return NextResponse.json({result})
    }
    catch(error) {
        console.error('delete-task request failed', error)
        return NextResponse.json({error: 'delete-task request failed'}, {status: 500})
    }

}