import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const res = await request.json()

    const { title } = res

    const result = await prisma.project.create({
        data: {
            title: title,
            description: 'hello',
            published: true,
        }
    })
    return NextResponse.json({result})
} 