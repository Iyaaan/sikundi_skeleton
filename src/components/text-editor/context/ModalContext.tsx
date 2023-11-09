import { Dialog } from "@sikundi/components/ui/dialog"
import { ReactNode, createContext, useCallback, useContext, useState } from "react"

const Context = createContext<any>(null)

export default function ModalContext({children}: {children: ReactNode}) {
    const [modal, setModal] = useState<null | {
        content: ReactNode
    }>(null)

    return (
        <Context.Provider value={[modal, setModal]}>
            <Dialog open={modal ? true : false} onOpenChange={() => {
                if (modal !== null) setModal(null)
            }}>
                {children}
                {modal?.content}
            </Dialog>
        </Context.Provider>
    )
}

export function OperateModal() {
    const [modal, setModal] = useContext(Context)
    
    const OpenModal = useCallback((content: ReactNode) => {
        setModal({
            content: content
        })
    }, [setModal])
    
    const CloseModal = useCallback(() => {
        setModal(null)
    }, [setModal])

    return {
        OpenModal,
        CloseModal
    }
}