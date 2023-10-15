import LogIn from '@sikundi/app/(sikundi)/sikundi-login/(forms)/log-in'
import Reset from '@sikundi/app/(sikundi)/sikundi-login/(forms)/reset'
import Verification from '@sikundi/app/(sikundi)/sikundi-login/(forms)/verification'
import PasswordUpdate from '@sikundi/app/(sikundi)/sikundi-login/(forms)/password-update'

interface Props {
    params: {}
    searchParams: { 
        action?: "lostpassword" | "otpverification" | "passwordupdate"
        key?: string
    }

}

export default function SignIn({params, searchParams }: Props) {
    if (searchParams.action === "lostpassword") {
        return (
            <Reset />
        )
    }


    if (searchParams.action === "otpverification") {
        return (
            <Verification />
        )
    }


    if (searchParams.action === "passwordupdate") {
        return (
            <PasswordUpdate />
        )
    }
    
    return (
        <LogIn />
    )
}
