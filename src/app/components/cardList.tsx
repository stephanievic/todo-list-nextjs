
import { useRouter } from "next/navigation"

interface CardListProps {
    icon: string
    title: string
    id: number
}

export default function CardList ({icon, title, id}:CardListProps) {
    const router = useRouter()

    const handlePageList = () => {
        router.push(`/list/${id}`)
    }
    
    return(
        <div className="w-[172px] h-[86px] flex items-center justify-center gap-2 px-8 py-7 text-center text-2xl font-medium text-purple-300 border  border-purple-100 rounded-xl cursor-pointer hover:opacity-80" onClick={handlePageList}>
            <div className="text-lg">{icon}</div>
            <h3 className="text-ellipsis overflow-hidden" >{title}</h3>
        </div>
    )
}