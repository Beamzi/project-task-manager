import React from 'react'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'


export async function POST(request: Request) {
    const res = await request.json()
    const { search } = res
    const result = await prisma.task.findMany({
        where: {
            title: {
                contains: search,
                mode: 'insensitive',
            }
        },
        include: {
            author: {
                select: {name: true}
            }
        }
    })
    return NextResponse.json({result})
}