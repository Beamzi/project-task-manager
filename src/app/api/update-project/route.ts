

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "../../../../auth"


export async function POST(request: Request) {
        const session = await auth()
    
    const res = await request.json()
    const { id, title, description } = res
    console.log({res}, 'asdsadasdsadas')
    const result = await prisma.project.update({
        where: {id: id, author: {id: session?.user?.id}},
        data: {
            title: title,
            description: description
        }
    })
    return NextResponse.json({result})

}