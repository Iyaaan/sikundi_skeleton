import { chain } from "@sikundi/middlewares/chain"
import { csrfMiddleware } from "@sikundi/middlewares/csrf"
import { sikundiMiddleware } from "@sikundi/middlewares/sikundi"
import { webMiddleware } from "@sikundi/middlewares/web"


export default chain([
    // csrfMiddleware,
    sikundiMiddleware, 
    webMiddleware
])

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}