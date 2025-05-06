

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const res = await request.json()
    const { id, title, description } = res
    console.log({res}, 'asdsadasdsadas')
    const result = await prisma.project.update({
        where: {id: id},
        data: {
            title: title,
            description: description
        }
    })
    return NextResponse.json({result})

}