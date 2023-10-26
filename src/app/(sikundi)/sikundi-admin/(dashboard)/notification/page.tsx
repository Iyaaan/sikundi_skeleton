'use client'

import Select2 from "@sikundi/components/ui/Select2"
import { Alert, AlertDescription, AlertTitle } from "@sikundi/components/ui/alert"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@sikundi/components/ui/select"
import { Brain } from "lucide-react"
import { Fragment } from "react"

export default async function Notifications() {

    return (
        <Fragment>
            <Alert>
                <Brain className="h-4 w-4" />
                <AlertTitle>Welcome to Sikundi WorkSpace!</AlertTitle>
                <AlertDescription>
                    In there sidebar you can access all the collections and plugins you have access to.
                </AlertDescription>
            </Alert>
            <Select2
                name="social"
                isMulti
                options={[
                    {label: "facebook", value: "facebook"},
                    {label: "instagram", value: "instagram"},
                    {label: "twitter", value: "twitter"}
                ]}
            />
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </Fragment>
    )
}

export const dynamic = "force-dynamic"