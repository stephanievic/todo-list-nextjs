import Menu from "@/app/components/menu";
import StarFavorite from "../../../../public/Star.svg"
import EditIcon from "../../../../public/PencilSquare.svg"
import DeleteIcon from "../../../../public/Trash.svg"
import AddLabel from "../../../../public/PlusCircleFill.svg"
import CalendarIcon from "../../../../public/CalendarEvent.svg"
import PriorityIcon from "../../../../public/ExclamationCircle.svg"
import CheckIcon from "../../../../public/CircleCheck.svg"
import Image from "next/image";
import CardLabel from "@/app/components/cardLabel";

export default function List () {
    return (
        <div className='min-h-screen flex bg-black-200'>
            <Menu/>

            <main className='w-full ml-[312px] p-[60px] space-y-5'>
                <div className="space-y-5 m-0">
                    <div className="text-6xl">❤️</div>
                    <div className="flex justify-between items-end">
                        <h1 className="font-bold text-4xl text-white-100">Nova lista</h1>
                        <div className="flex gap-5">
                            <Image src={StarFavorite} alt="Favorite icon"/>
                            <Image src={EditIcon} alt="Edit list icon" />
                            <Image src={DeleteIcon} alt="Delete list icon" />
                        </div>
                    </div>
                </div>
                
                <div className="flex gap-3 items-center">
                    <CardLabel name={"Book"} id={0} color="secondary" size="small"/>
                    <Image src={AddLabel} alt={"Plus circle"} className="size-7"/>
                </div>

                <div className="flex flex-col gap-3 p-5 border border-white-100 rounded-lg">
                    <input type="text" placeholder="Criar nova tarefa" className="text-bold text-white-100 bg-transparent text-base placeholder:text-bold placeholder:text-white-100 placeholder:text-base outline-none"/>

                    <div className="flex justify-between">
                        <div className="flex gap-3">
                            <button className="flex gap-2 items-center px-3 py-2 rounded-lg text-xs text-white-100 border border-white-100">
                                Data de realização <Image src={CalendarIcon} alt="calendar icon"/>
                            </button>
                            <button className="flex gap-2 items-center px-3 py-2 rounded-lg text-xs text-white-100 border border-white-100">
                                Prioridade <Image src={PriorityIcon} alt="calendar icon"/>
                            </button>
                        </div>

                        <button className="w-fit text-center px-[18px] py-[9.5px] text-sm text-white-100 bg-purple-300 rounded-lg">
                            Criar
                        </button>
                    </div>
                </div>

                <div className="flex justify-between p-5 border border-white-100 rounded-lg">
                    <div className="flex gap-2">
                        <Image src={CheckIcon} alt="check"/>
                        <input type="text" placeholder="Nome da tarefa" className="text-bold text-white-100 bg-transparent text-base placeholder:text-bold placeholder:text-white-100 placeholder:text-base outline-none"/>
                    </div>

                    <div className="flex divide-x divide-solid">
                        <button className="flex gap-2 items-center px-3 text-xs text-white-100">
                            <Image src={CalendarIcon} alt="calendar icon"/>
                            25/11/2024
                        </button>
                        <button className="flex gap-2 items-center px-3 text-xs text-white-100">
                            <Image src={PriorityIcon} alt="calendar icon"/>
                            Prioridade 
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}