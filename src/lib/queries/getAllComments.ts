import React from 'react'

import { prisma } from '../prisma'
import { auth } from '../../../auth'
import { Prisma } from '@prisma/client'


const getAllCommentsQuery = {
    include: {
        author: {
            select: { name: true }
        },
        // project: {
        //     select: {
        //         title: true
        //     }
        // }
    },
} as const


export type GetAllCommentsTypeof = Prisma.CommentsGetPayload<typeof getAllCommentsQuery>

export default  async function getAllComments() {
    const session = await auth()

    const comments = await prisma.comments.findMany({
        where: { 
            author: {
                id: session?.user?.id
            }
        },
        ...getAllCommentsQuery
        
    })
    return comments
}
