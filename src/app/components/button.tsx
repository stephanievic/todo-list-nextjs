interface ButtonProps{
    title: string
}

export default function Button ({title}:ButtonProps){
    return (
        <button type="submit" className="w-[180px] h-12 bg-purple-300 rounded-[36px] font-bold text-2xl text-white-100 hover:opacity-80">
            {title}
        </button>
    )
}