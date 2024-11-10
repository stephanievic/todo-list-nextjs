import { Dispatch, SetStateAction } from "react"

interface InputProps {
    type: string
    label: string
    placeholder: string
    value: Dispatch<SetStateAction<string>>
}

export default function Input ({type, label, placeholder, value}:InputProps) {
    return (
        <div className="flex flex-col gap-3 w-full">
            <label className="text-base text-black-200">{label}</label>
            <input type={type} placeholder={placeholder} onChange={(event) => value(event.target.value)} required className="h-14 rounded-2xl px-6 outline-none bg-transparent border border-black-200 placeholder-gray"/>
        </div>
    )
}