import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { auth } from "../../../../auth"

export async function POST(request: Request) {
    const session = await auth()
    const res = await request.json()
    const { title, description } = res
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