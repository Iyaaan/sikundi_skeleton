import { Button } from "@sikundi/components/ui/button"
import { File } from "lucide-react"
import Link from "next/link"

export default function EmptyPlaceholder() {
  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <File className="h-10 w-10 text-muted-foreground" />

        <h3 className="mt-4 text-lg font-semibold">No posts added</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">
          You have not added any posts. Add one below.
        </p>
        <Button size="sm" className="relative">
            {/* <Link href={'/sikundi-admin/post/create'}>Add Post</Link> */}
            Add Post
        </Button>
      </div>
    </div>
  )
}