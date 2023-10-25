'use client'

import { SelectComponent } from "@sikundi/components/ui/ReactSelect"
import { Alert, AlertDescription, AlertTitle } from "@sikundi/components/ui/alert"
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
            <SelectComponent
                createAble={true}
                isMulti={true}
                asyncLoading
                defaultOptions={[
                    {value: "1", label: "1"},
                    {value: "2", label: "2"},
                    {value: "3", label: "3"},
                    {value: "4", label: "4"},
                    {value: "5", label: "5"},
                ]}
                placeholder="Select Skills"
            />
        </Fragment>
    )
}

export const dynamic = "force-dynamic"