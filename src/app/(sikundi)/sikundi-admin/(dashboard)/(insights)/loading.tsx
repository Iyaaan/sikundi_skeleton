import { Skeleton } from "@sikundi/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="grid gap-4 md:grid-cols-12">
            {[1,2,3,4].map((value, index) => <Skeleton className="lg:col-span-3 md:col-span-6 aspect-[4.8/2]" key={index} />)}
            <Skeleton className="lg:col-span-8 md:col-span-12 aspect-[5/2.5]" />
            <Skeleton className="lg:col-span-4 md:col-span-12 h-full min-h-[350px]" />
            <Skeleton className="lg:col-span-4 md:col-span-12 h-full min-h-[250px]" />
            <Skeleton className="lg:col-span-8 md:col-span-12 h-full min-h-[250px]" />
        </div>
    )
}