import { type NextRequest } from 'next/server'
import path from 'path'
import { promises as fs } from "fs"

export async function GET(request: NextRequest, { params }: { params: { path: string } }) {
    try {
        const { path:fileName } = params
        const filePath = path.join('./storage', fileName)
        const file = await fs.readFile(filePath)
        return new Response(file)
    } catch (error) {
        return new Response("file not found", {
            status: 404
        })
    }
}