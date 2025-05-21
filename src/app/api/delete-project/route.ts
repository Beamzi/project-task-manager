import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "../../../../auth"


export async function DELETE(request: Request) {
        const session = await auth()

    const res = await request.json()
    const { projectId } = res
    const result = await prisma.project.delete({
        where: {id: projectId, author: {id: session?.user?.id}}
    })
    return NextResponse.json({result})
}
