import { chain } from "@sikundi/middlewares/chain"
import { sikundiMiddleware } from "@sikundi/middlewares/sikundi"
import { webMiddleware } from "@sikundi/middlewares/web"

export default chain([
    sikundiMiddleware, 
    webMiddleware
])

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}