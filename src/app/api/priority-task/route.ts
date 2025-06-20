import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authCheck } from "@/lib/authCheck";

export async function POST(request: Request) {
    try {
        const sessionCheck = await authCheck()
        if (sessionCheck instanceof NextResponse) {
            return sessionCheck
        }
        const session = sessionCheck
        const res = await request.json()
        const { priority, id } = res

        const result = await prisma.task.update({
            where: {id: id, author: {id: session?.user?.id}},
            data: {
                priority: priority
            }
        })
        return NextResponse.json({ result })
    }
    catch(error) {
        console.error('priority-task request failed', error)
        return NextResponse.json({error: 'priority-task request failed'}, {status: 500})
    }
}