interface CardListProps {
    icon: string
    title: string
}

export default function CardList ({icon, title}:CardListProps) {
    return(
        <div className="w-[172px] h-[86px] flex items-center gap-2 px-8 py-7 text-center text-2xl font-medium text-purple-300 border  border-purple-100 rounded-xl">
            <div className="text-lg">{icon}</div>
            <h3 className="text-ellipsis overflow-hidden" >{title}</h3>
        </div>
    )
}