import { prisma } from "@/lib/prisma";
import { auth } from "../../../auth";

export async function getAllProjects() {
    const session = await auth()
    if (!session) return null
    const allProjects = await prisma.project.findMany({
        where: {
            published: true,
            author: {
                id: session?.user?.id
            }
        },
        include: {
            author: {
                select: { name: true}
            },
            tasks: {
                orderBy: {
                    date: 'desc'
                },
                include: {
                    author: {
                        select: {name: true}
                    }
                }
            },
            comments: {
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    author: {
                        select: {name: true}
                    }
                }
            },
        }
    })
    return allProjects
}



/*import { prisma } from "@/lib/prisma";
import { auth } from "../../../auth";

export async function getAllProjects() {
    const session = await auth()
    if (!session) return null
    const allProjects = await prisma.project.findMany({
        where: {
            published: true,
            author: {
                id: session?.user?.id
            }
        },
        include: {
            author: {
                select: { name: true}
            },
            tasks: {
                orderBy: {
                    date: 'desc'
                },
                include: {
                    author: {
                        select: {name: true}
                    }
                }
            },
            comments: {
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    author: {
                        select: {name: true}
                    }
                }
            },
        }
    })
    return allProjects
} */