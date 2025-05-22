import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { auth } from "../../../../auth"


export async function POST(request: Request) {
    const session = await auth()
    const res = await request.json()
    const { title, content, id, date } = res
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