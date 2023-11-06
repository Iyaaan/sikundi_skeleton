import { Fragment } from "react";
import LandScapeAd from "@sikundi/components/web/ad/LandScapeAd";
import VarientOne from "@sikundi/components/web/blocks/VarientOne";
import VarientThree from "@sikundi/components/web/blocks/VarientThree";
import VarientTwo from "@sikundi/components/web/blocks/VarientTwo";
import VarientFour from "@sikundi/components/web/blocks/VarientFour";
import VarientFive from "@sikundi/components/web/blocks/VarientFive";

export default function Home() {
    return (
        <Fragment>

            <VarientOne className="mb-12" />
            <LandScapeAd href={"https://bankofmaldives.com.mv"} 
                target="_blank"
                containerClass="container px-4 mb-10"
                data={{
                    coverImage: `/sample_media/ZWMyZTExMjNlNTBhZTVlYWQ1NWVkMGFiYTAyNGYzNzY=.png`,
                    alt: "Bank Of Maldives"
                }}
            />
            <VarientTwo className="mb-12" />
            <VarientThree title="ފޮޓޯ ގެލެރީ" className="mb-12" />
            <LandScapeAd href={"https://bankofmaldives.com.mv"} 
                target="_blank"
                containerClass="container px-4 mb-10"
                data={{
                    coverImage: `/sample_media/NzVkNTc1ZmM5MzViZTRiYzMwMDJkYTI2OWIxMjA5OGM=.gif`,
                    alt: "Bank Of Maldives"
                }}
            />
            <VarientFour title="ރިޕޯޓް" className="mb-12" />
            <VarientFive title="ގްރެފިކްސް" className="mb-12" />
            <VarientOne title="ކުޅިވަރު" className="mb-12" />

        </Fragment>
    )
}