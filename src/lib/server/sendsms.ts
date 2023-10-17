import { initClient } from 'messagebird'
import { msisdn } from 'messagebird/types/general'

export default async function sendOtp(details: {originator: msisdn, recipients:msisdn[]}, message:string):Promise<{details?: unknown, message?: string}> {
    const messagebird = initClient(String(process.env.MESSAGE_BIRD_API_KEY))
    return new Promise((resolve, reject)=>{
        messagebird.messages.create({
            originator: details.originator,
            recipients: details.recipients,
            body: message
        }, (err, res) => {
            if (err) return reject({ message: "fail to send sms", details: err })
            else return resolve({ message: "successfully sms sent", details: res })
        })
    })
}