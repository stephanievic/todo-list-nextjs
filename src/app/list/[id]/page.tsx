'use client'

import Calendar from "@/app/components/calendar";
import CardLabel from "@/app/components/cardLabel";
import Menu from "@/app/components/menu";
import Image from "next/image";
import { useState } from "react";
import CalendarIcon from "../../../../public/CalendarEvent.svg";
import PriorityIcon from "../../../../public/ExclamationCircle.svg";
import EditIcon from "../../../../public/PencilSquare.svg";
import AddLabel from "../../../../public/PlusCircleFill.svg";
import StarFavorite from "../../../../public/Star.svg";
import DeleteIcon from "../../../../public/Trash.svg";
import CardTask from "@/app/components/cardTask";

export default function List() {
    const [newTaskDate, setNewTaskDate] = useState<Date>()
    const [isOpenCalendarModal, setIsOpenCalendarModal] = useState(false)

    const openCalendarModal = () => {
        setIsOpenCalendarModal(true)
    }

    const closeCalendarModal = () => {
        setIsOpenCalendarModal(false)
    }

    return (
        <div className='min-h-screen flex bg-black-200'>
            <Menu />

            <main className='w-full ml-[312px] p-[60px] space-y-5'>
                <div className="space-y-5 m-0">
                    <div className="text-6xl">❤️</div>
                    <div className="flex justify-between items-end">
                        <h1 className="font-bold text-4xl text-white-100">Nova lista</h1>
                        <div className="flex gap-5">
                            <Image src={StarFavorite} alt="Favorite icon" />
                            <Image src={EditIcon} alt="Edit list icon" />
                            <Image src={DeleteIcon} alt="Delete list icon" />
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 items-center">
                    <CardLabel name={"Book"} id={0} color="secondary" size="small" />
                    <Image src={AddLabel} alt={"Plus circle"} className="size-7" />
                </div>

                <div className="flex flex-col gap-3 p-5 border border-white-100 rounded-lg">
                    <input type="text" placeholder="Criar nova tarefa" className="text-bold text-white-100 bg-transparent text-base placeholder:text-bold placeholder:text-white-100 placeholder:text-base outline-none" />

                    <div className="flex justify-between">
                        <div className="flex gap-3">
                            <button onClick={openCalendarModal} className="flex gap-2 items-center px-3 py-2 rounded-lg text-xs text-white-100 border border-white-100">
                                {newTaskDate ? newTaskDate.toLocaleDateString() : `Data de realização`} <Image src={CalendarIcon} alt="calendar icon" />
                            </button>
                            <button className="flex gap-2 items-center px-3 py-2 rounded-lg text-xs text-white-100 border border-white-100">
                                Prioridade <Image src={PriorityIcon} alt="calendar icon" />
                            </button>
                        </div>

                        <button className="w-fit text-center px-[18px] py-[9.5px] text-sm text-white-100 bg-purple-300 rounded-lg">
                            Criar
                        </button>
                    </div>
                </div>

                <CardTask id={1} isChecked={false} dateToComplete={undefined} name="Amor" priority={1}/>
            </main>

            {
                isOpenCalendarModal && <Calendar selected={newTaskDate} setSelected={setNewTaskDate} onClose={closeCalendarModal}/>
            }
        </div>
    )
}