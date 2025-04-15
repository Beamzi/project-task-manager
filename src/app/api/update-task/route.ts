import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const res = await request.json()
    console.log({res})

    const { title, id } = res

    const result = await prisma.task.update({
        where: {id: id},
        data: {
            title: title
        }
    })

    return NextResponse.json({result})



}