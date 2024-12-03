import { useUserStore } from "@/store/useUserStore";
import Image from "next/image";

export default function HeaderUser() {
    const user = useUserStore(state => state.user)
    const CurrentDate = new Date()
    const weekdayOfToday = CurrentDate.toLocaleDateString('pt-BR', { weekday: 'long' })

    return (
        <div className="flex flex-col w-fit">
            <div className="flex gap-5 items-center">
                {
                    user?.photo && (
                        <Image src={user.photo} alt="exemplo de foto de perfil" className="rounded-full" width={70} height={70} />
                    )
                }
                <h1 className="text-4xl text-white-100 font-bold">Olá, {user?.name} 👋</h1>
            </div>

            <p className="ml-[92px] text-xl text-purple-100">{weekdayOfToday}, {CurrentDate.toLocaleDateString()}</p>
        </div>
    )
}