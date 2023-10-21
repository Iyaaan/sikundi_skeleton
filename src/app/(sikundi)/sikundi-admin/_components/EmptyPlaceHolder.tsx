import { Button } from "@sikundi/components/ui/button"
import { File } from "lucide-react"

interface Props {
    data: {
        slug: string;
        name: string;
        url: string
        permissions: {
            create: boolean
        }
    }
}

export default function EmptyPlaceholder(props:Props) {
  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <File className="h-10 w-10 text-muted-foreground" />

        <h3 className="mt-4 text-lg font-semibold">No {props.data.name} added</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">
          You have not added any {props.data.name}. {props.data.permissions.create && "Add one below."}
        </p>
        {props.data.permissions.create && <Button size="sm" className="relative">
            Add {props.data.slug}
        </Button>}
      </div>
    </div>
  )
}