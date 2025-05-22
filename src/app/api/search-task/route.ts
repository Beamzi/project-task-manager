import React from 'react'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { auth } from "../../../../auth"



export async function POST(request: Request) {
    const session = await auth()
    const res = await request.json()
    const { search } = res
    const result = await prisma.task.findMany({
        where: {
            title: {
                contains: search,
                mode: 'insensitive',
            },
             author: {id: session?.user?.id}
        },
        include: {
            author: {
                select: {name: true}
            }
        }
    })
    return NextResponse.json({result})
}