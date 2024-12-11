import X from '../../public/X.svg'

interface ModalProps {
    title: string
    children: React.ReactNode
    onClose: () => void
}

export default function Modal({ title, children, onClose }: ModalProps) {
    return (
        <div className="z-20 fixed inset-0 h-screen w-screen flex items-center justify-center bg-black-200 bg-opacity-75"
            onClick={onClose}
        >
            <div onClick={(e) => e.stopPropagation()} className="w-[535px] flex flex-col gap-10 p-5 bg-white-50 rounded-[20px]">
                <div className="flex justify-between">
                    <h1 className="text-4xl font-bold text-purple-400">{title}</h1>

                    <X onClick={onClose} className="cursor-pointer hover:opacity-80"/>
                </div>


                {children}
            </div>
        </div>
    )
};
