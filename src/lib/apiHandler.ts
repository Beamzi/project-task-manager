import { NextResponse } from "next/server"


export async function apiHandler(handler: Function, endPoint: string ) {
    try {
        return await handler()
    }
    catch(error) {
        console.log(`${endPoint} Request Failed`, error)
        return NextResponse.json({error: `${endPoint} Request Failed`}, {status: 500})
    }


}