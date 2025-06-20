import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { authCheck } from "@/lib/authCheck"

export async function DELETE(request:Request) {
    try {
        const sessionCheck = await authCheck()
        if (sessionCheck instanceof NextResponse) {
            return sessionCheck
        }
        const session = sessionCheck
        const res = await request.json()
        const { projectId } = res

        const result = await prisma.comments.deleteMany({
            where: { 
                author: { 
                    id: session?.user?.id
                },
                projectId: projectId,
            }
        })
    return NextResponse.json({result})
    }
    catch(error){
        console.error('batch-delete-project-comments request failed', error)
        return NextResponse.json({error: 'batch-delete-project-comments request failed'}, {status: 500})
    }
}
