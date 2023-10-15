import { type NextRequest } from 'next/server'
import { headers } from 'next/headers'

export async function GET(request: NextRequest) {
    return Response.json({ status: "ok" })
}