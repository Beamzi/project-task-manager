import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authCheck } from "@/lib/authCheck";

export async function POST(request: Request) {
    try {
        const sessionCheck = await authCheck();
        if (sessionCheck instanceof NextResponse) {
            return sessionCheck
        }
        const session = sessionCheck
        const res = await request.json();
        const { id, content } = res;

        const result = await prisma.comments.update({
        where: { id: id, author: { id: session?.user?.id } },
        data: {
            content: content,
        },
        });
        return NextResponse.json({ result });
    } 
    catch(error) {
        console.error('edit-comment request failed', error)
        return NextResponse.json({error: 'edit-comment request failed'}, {status: 500})
    }
}
