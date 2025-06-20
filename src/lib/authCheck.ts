
import { NextResponse } from "next/server";
import { auth } from "../../auth";

export async function authCheck() {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return NextResponse.json({error: 'Unauthorised'}, {status: 401})
        }
        return session
    }
    catch(e) {
        console.error(e)
        return NextResponse.json({error: 'Server Not Responding'}, {status: 500})
    }

}