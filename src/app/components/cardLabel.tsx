import TagIcon from "../../../public/Tag.svg"
import Image from "next/image"

interface CardLabelProps {
    name: string
    id: number
}

export default function CardLabel ({name, id}:CardLabelProps) {
    return (
        <div className="flex gap-2 w-[200px] p-3 text-purple-100 border border-purple-100 rounded-xl cursor-pointer hover:opacity-80">
            <Image src={TagIcon} alt="icone de tag"/>
            <p>{name}</p>
        </div>
    )
}