import { Button } from "@sikundi/components/ui/button"
import { LucideIcon } from "lucide-react"
import Link from "next/link";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    data: {
        slug: string;
        name: string;
        url: string
        deleted?: boolean
        Icon: LucideIcon
        permissions: {
            create: boolean
        }
    }
}

export default function EmptyPlaceholder({data, ...props}:Props) {
    return (
        <div className={twMerge(["flex h-[450px] items-center justify-center rounded-md border border-dashed", props.className])} {...props}>
            <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                <data.Icon className="h-10 w-10 text-muted-foreground" />

                <h3 className="mt-4 text-lg font-semibold">No {data.name} {data.deleted ? "deleted" : "added"}</h3>
                <p className="mb-4 mt-2 text-sm text-muted-foreground">
                You have not {data.deleted ? "deleted" : "added"} any {data.name}. {data.permissions.create && `Add one below.`}
                </p>
                {data.permissions.create && <Button size="sm" className="relative" asChild>
                    <Link href={`${data.url}/create`}>Add {data.slug}</Link>
                </Button>}
            </div>
        </div>
    )
}