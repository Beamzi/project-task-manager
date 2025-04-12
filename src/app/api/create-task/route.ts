
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { format } from "date-fns"

export async function POST(request: Request) {
    const res = await request.json()

    console.log({res}, 'its alive!!!!!!!!!!!!!!!!!!!!! OMFG!!!!')

    const { title, content, date } = res

    

    const result = await prisma.task.create({
        data: {
            published: true,
            title: title,
            date: new Date(date),
            content: content,
        }
    })
    
    return NextResponse.json({result})

}