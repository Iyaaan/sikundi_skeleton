import { type NextRequest } from 'next/server'
import path from 'path'
import { promises as fs } from "fs"

export async function GET(request: NextRequest, { params }: { params: { path: string } }) {
    try {
        // @ts-ignore
        const { path:fileName }:{ path: string[] } = params
        
        const filePath = path.join('./storage', fileName?.join("/"))
        const file = await fs.readFile(filePath)
        return new Response(file, {
            headers: {
                'cache-control': 'public, max-age=31536000, immutable',
            }
        })
    } catch (error) {
        return new Response("file not found", {
            status: 404
        })
    }
}

export const dynamic = 'force-static'
export const dynamicParams = true
export const revalidate = 'force-cache'
export const runtime = 'nodejs'

