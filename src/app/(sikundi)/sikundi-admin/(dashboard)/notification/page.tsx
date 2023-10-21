import { Alert, AlertDescription, AlertTitle } from "@sikundi/components/ui/alert";
import { Brain } from "lucide-react";

export default async function Notifications() {
    return (
        <div className="container mx-auto p-4">
            <div className="flex lg:items-center justify-between space-y-2 flex-col lg:flex-row gap-y-1 mb-4">
                <h2 className="text-2xl font-bold tracking-tight">Notifications</h2>
            </div>
            
            <Alert>
                <Brain className="h-4 w-4" />
                <AlertTitle>Welcome to Sikundi WorkSpace!</AlertTitle>
                <AlertDescription>
                    In there sidebar you can access all the collections and plugins you have access to.
                </AlertDescription>
            </Alert>
        </div>
    )
}
