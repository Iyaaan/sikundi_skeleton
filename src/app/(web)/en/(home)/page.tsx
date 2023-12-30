import dynamic from 'next/dynamic'
import React, { Fragment } from 'react'

export default function Page() {
    const VarientOne = dynamic(() => import('@sikundi/app/(web)/en/_components/blocks/VarientOne'), {
        loading: () => {
            return (
                <div className="lg:rounded-lg bg-web-tertiary dark:bg-web-tertiary-dark w-full aspect-video">

                </div>
            )
        }
    })
    const VarientTwo = dynamic(() => import('@sikundi/app/(web)/en/_components/blocks/VarientTwo'), {
        loading: () => {
            return (
                <div className="lg:rounded-lg bg-web-tertiary dark:bg-web-tertiary-dark w-full aspect-video">

                </div>
            )
        }
    })
    const VarientThree = dynamic(() => import('@sikundi/app/(web)/en/_components/blocks/VarientThree'), {
        loading: () => {
            return (
                <div className="lg:rounded-lg bg-web-tertiary dark:bg-web-tertiary-dark w-full aspect-video">

                </div>
            )
        }
    })
    const VarientFour = dynamic(() => import('@sikundi/app/(web)/en/_components/blocks/VarientFour'), {
        loading: () => {
            return (
                <div className="lg:rounded-lg bg-web-tertiary dark:bg-web-tertiary-dark w-full aspect-video">

                </div>
            )
        }
    })
    const VarientFive = dynamic(() => import('@sikundi/app/(web)/en/_components/blocks/VarientFive'), {
        loading: () => {
            return (
                <div className="lg:rounded-lg bg-web-tertiary dark:bg-web-tertiary-dark w-full aspect-video">

                </div>
            )
        }
    })
    const VarientSix = dynamic(() => import('@sikundi/app/(web)/en/_components/blocks/VarientSix'), {
        loading: () => {
            return (
                <div className="lg:rounded-lg bg-web-tertiary dark:bg-web-tertiary-dark w-full aspect-video">

                </div>
            )
        }
    })
    const VarientSeven = dynamic(() => import('@sikundi/app/(web)/en/_components/blocks/VarientSeven'), {
        loading: () => {
            return (
                <div className="lg:rounded-lg bg-web-tertiary dark:bg-web-tertiary-dark w-full aspect-video">

                </div>
            )
        }
    })
    const VarientEight = dynamic(() => import('@sikundi/app/(web)/en/_components/blocks/VarientEight'), {
        loading: () => {
            return (
                <div className="lg:rounded-lg bg-web-tertiary dark:bg-web-tertiary-dark w-full aspect-video">

                </div>
            )
        }
    })

    return (
        <Fragment>

        </Fragment>
    )
}
