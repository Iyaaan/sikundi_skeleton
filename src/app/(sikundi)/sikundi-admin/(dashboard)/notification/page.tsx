'use client'

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
        </Fragment>
    )
}

export const dynamic = "force-dynamic"