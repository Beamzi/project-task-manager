import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
    const res = await request.json()
    const { projectId } = res
    const result = await prisma.project.delete({
        where: {id: projectId}
    })
    return NextResponse.json({result})
}
