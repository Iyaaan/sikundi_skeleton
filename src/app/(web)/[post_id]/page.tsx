import PortraitAd from "@sikundi/components/web/ad/PortraitAd"
import Feature from "@sikundi/app/(web)/[post_id]/(blocks)/Feature"
import RelatedPosts from "@sikundi/app/(web)/[post_id]/(blocks)/RelatedPosts"
import Comment from "@sikundi/app/(web)/[post_id]/(blocks)/Comment"
import Paragraph from "./(blocks)/Paragraph"
import Heading from "./(blocks)/Heading"
import Quote from "./(blocks)/Quote"

interface Props { 
    params: { 
        post_id: number 
    } 
}

export default function SinglePage(props: Props) {
    return (
        <div className="container grid grid-cols-12 lg:gap-x-14 lg:gap-y-4 lg:px-4 px-0">
            <div className="lg:col-span-9 col-span-12">
                <Feature className="pb-12" data={{
                    title: "އިހަވަންދޫ ހަމަނުޖެހުން: އަނިޔާވި ކައުންސިލަރު އިތުރު ފަރުވާއަށް މާލެ ފުރުވާލަނީ!",
                    featureImage: "/sample_media/375572_3_74044c3b4ecfde58cc717cab4eea94b4780de82b_large.jpg",
                    tags: ["ރިޕޯޓު", "މަސްތުވާތަކެތި"],
                    published: {
                        by: {
                            name: "ޝަޖާއަތު އަހުމަދު",
                            photo: ""
                        },
                        date: new Date(),
                    },
                    social: {
                        facebook: "",
                        instagram: "",
                        youtube: "",
                        whatsapp: ""
                    }
                }} />
                <div className="px-6 max-w-3xl mx-auto">
                    <Paragraph>
                        {"ފެންނަނީ ގޮތެއް ފޮތެއް ނެތި ސަރުކާރުން ރިޔާސީ އިންތިހާބަށް ނުފޫޒު ފޯރުވާތަން ކަމަށް ރައްޔިތުން މަޖިލީހުގެ ކެންދޫ ދާއިރާގެ މެންބަރު އަލީ ހުސެއިން ވިދާޅުވެއްޖެއެވެ."}
                    </Paragraph>
                    <Paragraph>
                        {"މިއަދު ރައްޔިތުންގެ މަޖިލިސް ޖަލްސާގައި ވާހަކަދައްކަވަމުން އަލީ ހުސެއިން ވިދާޅުވީ ދައުލަތުން އިންތިހާބުތަކަށް ނުފޫޒު ފޯރުވާ ވާހަކައަކީ އާވަހަކައެއް ނޫން ކަމަށާއި ފާއިތުވި 15 އަހަރު ވެސް ދިވެހިން ދައްކަން ޖެހުނު ވާހަކައަކީ އެއީ ކަމަށެވެ."}
                    </Paragraph>
                    <Heading>
                        {"ހާވާސާއި ތިން ބޭފުޅުން"}
                    </Heading>
                    <Paragraph>
                        {"އިންތިހާބުތަކަށް ދައުލަތުން، ސަރުކާރުން ނުފޫޒު ފޯރުވާ ވާހަކަ ދައްކަން ޖެހޭ އެއްސަބަބަކީ 2008 ވަނަ އަހަރުގެ ގާނޫނު އަސާސީގައި ތަސައްވަރު ކޮށްފައިވާ ކަންކަން ވެސް އެކަށީގެންވާ ގޮތެއްގައި ތަންފީޒު ކުރެވިފައެއް ނެތުން ކަމަށް އޭނާ ވިދާޅުވިއެވެ."}
                    </Paragraph>
                    <Quote>
                        {`އަލީ ހުސެއިން ވިދާޅުވީ ސަރުކާރާއި އިދިކޮޅުގައި ތިބޭއިރު ކޮންމެ ބަޔަކު ވެސް އެވާހަކަ ދައްކާ ކަމަށާއި ނަމަވެސް ވެރިކަން ލިބުމުން އަނެއްކާވެސް އޮންނަނީ ކުރިން ކުރި ގޯސް ކަންކަން ތަކުރާރު ކުރުން ކަމަށެވެ. "ކުރަން އައީ ކޮންކަމެއްކަމެއް، ބަދަލު ކުރާން ވައުދުވީ ކޮން ކަމެއްކަމެއް، އިސްލާހު ކުރާނީ ކޮންކަމެއްކަން ހަނދާނެއް ނެތް." އަލީ ހުސެއިން ވިދާޅުވިއެވެ.`}
                    </Quote>
                    <Paragraph>
                        {"އޭނާ ވިދާޅުވީ ގާނޫނު އަސާސީ އައުމުން އެންމެ ބޮޑަށް ދެކެވުނު އެއްވާހަކައަކީ ހިޔާލު ފާޅުކުރުމުގެ "}
                    </Paragraph>
                    <Paragraph>
                        {"މިނިވަންކަމުގެ ވާހަކަ ކަމަށެވެ. ދައުލަތް ވާން ޖެހޭނީ މީޑިއާތައް ރެގިއުލޭޓް ކުރާ ތަނަކަށް ކަމަށާއި ނަމަވެސް ފެންނަނީ ކޮންމެ އިރަކު ވެސް އޭރެއްގެ އޮންނަ ސަރުކާރެއްގެ ޕްރޮޕެގެންޑާ ފަތުރާ މެޝިނަކަށް ދައުލަތުގެ ޓީވީ އާއި ރޭޑިއޯ ވެގެންދާ މަންޒަރު ކަމަށް އަލީ ހުސެއިން ވިދާޅުވިއެވެ. އޭގެ އިތުރުން މިހާރު ފެންނަމުންދާ މަންޒަރަކީ ނޫސްތައް ގަނެގެން ނޫސްތަކުގެ ކޮންޓްރޯލް ސަރުކާރުން ނަގަމުންދާ މަންޒަރު ކަމަށް އަލީ ހުސެއިން ވިދާޅުވިއެވެ."}
                    </Paragraph>
                </div>
            </div>
            <div className="lg:col-span-3 lg:row-span-2 col-span-12 px-4 lg:px-0">
                <div className="sticky top-28 pb-8">
                    <p dir="ltr">{"Advertisement"}</p>
                    <PortraitAd href={"https://sonee.com.mv"} 
                        target="_blank"
                        className="block mb-4"
                        data={{
                            coverImage: `/sample_media/OGQ2OWE4MDJkOGY5Y2Q4NzAzYzI2NGRkMTQ3YTFjZmE=.jpg`,
                            alt: "Sonnee Hardware"
                        }}
                    />
                    <p dir="ltr">{"Advertisement"}</p>
                    <PortraitAd href={"https://sonee.com.mv"} 
                        target="_blank"
                        className="block"
                        data={{
                            coverImage: `/sample_media/OGQ2OWE4MDJkOGY5Y2Q4NzAzYzI2NGRkMTQ3YTFjZmE=.jpg`,
                            alt: "Sonnee Hardware"
                        }}
                    />
                </div>
            </div>
            <div className="lg:col-span-9 col-span-12">
                <RelatedPosts className="mb-12" />
            </div>
            <div className="lg:col-span-9 col-span-12">
                <Comment />
            </div>
        </div>
    )
}