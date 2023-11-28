import { type NextRequest } from 'next/server'
import path from 'path'
import { promises as fs } from "fs"
import { redirect } from 'next/navigation'

export async function GET(request: NextRequest, { params }: { params: { path: string } }) {
    try {
        const { path:fileName } = params

        if(process.env.NEXT_PUBLIC_CDN_URL) {
            // @ts-ignore
            return redirect(`${process.env.NEXT_PUBLIC_CDN_URL}${[...fileName].join("/")}`)
        }
        // @ts-ignore
        const filePath = path.join('./storage', fileName?.join("/"))
        const file = await fs.readFile(filePath)
        return new Response(file)
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

