'use client'
import Image from "next/image";

import CalendarIcon from "../../../public/CalendarEvent.svg";
import CheckIcon from "../../../public/Checked.svg";
import UncheckIcon from "../../../public/Unchecked.svg";
import PriorityIcon from "../../../public/ExclamationCircle.svg";
import Calendar from "./calendar";
import { useState } from "react";
import { setPriority } from "os";

interface CardTaskProps {
    id: number
    name: string
    isChecked: boolean
    priority?: number
    dateToComplete: Date | undefined
}

export default function CardTask({ id, name, isChecked, priority, dateToComplete }: CardTaskProps) {
    const [dateTask, setDateTask] = useState<Date | undefined>(dateToComplete)
    const [check, SetCheck] = useState(isChecked)
    const [priorityTask, setPriorityTask] = useState(priority)

    const priorityLabel = ['Baixa', 'Média', 'Alta']

    const [isOpenCalendarModal, setIsOpenCalendarModal] = useState(false)
    const [isOpenPrioritySelect, setIsOpenPrioritySelect] = useState(false)

    const openCalendarModal = () => {
        setIsOpenCalendarModal(true)
    }

    const closeCalendarModal = () => {
        setIsOpenCalendarModal(false)
    }

    const openPrioritySelect = () => {
        setIsOpenPrioritySelect(true)
    }

    const closePrioritySelect = () => {
        setIsOpenPrioritySelect(false)
    }

    const handleIsChecked = () => {
        SetCheck(!check)
    }

    const handlePriority = (value: number) => {
        setPriorityTask(value)
        
        setIsOpenPrioritySelect(false)
    }

    return (
        <div className={`flex justify-between p-5 border border-white-100 rounded-lg ${check && 'opacity-60'}`}>
            <div className="flex gap-2">
                <Image onClick={handleIsChecked} src={check ? CheckIcon : UncheckIcon} alt="check" className="cursor-pointer hover:opacity-75" />

                {
                    check ? (
                        <h1 className="text-bold text-white-100 bg-transparent text-base line-through">{name}</h1>
                    ) : (
                        <input type="text" placeholder={name} className="text-bold text-white-100 bg-transparent text-base placeholder:text-bold placeholder:text-white-100 placeholder:text-base outline-none" />
                    )
                }
            </div>

            {
                !check && (
                    <div className="flex divide-x divide-solid">
                        <button onClick={openCalendarModal} className="flex gap-2 items-center px-3 text-xs text-white-100">
                            <Image src={CalendarIcon} alt="calendar icon" />
                            {dateTask && dateTask.toLocaleDateString()}
                        </button>

                        <div onClick={openPrioritySelect} className="relative flex gap-2 items-center px-3 text-xs text-white-100 cursor-pointer">
                            <Image src={PriorityIcon} alt="calendar icon" />
                            {priorityTask && priorityLabel[priorityTask]}

                            {
                                isOpenPrioritySelect && (
                                    <div className="absolute inset-0 top-8 left-3 h-max flex flex-col divide-y divide-gray bg-black-200 border border-gray rounded-lg">
                                        <button onClick={() => handlePriority(0)} className="py-3 font-bold text-green-400 hover:opacity-75 hover:bg-black-100 rounded-t-lg">Baixa</button>
                                        <button onClick={() => handlePriority(1)} className="py-3 font-bold text-yellow-400 hover:opacity-75 hover:bg-black-100">Média</button>
                                        <button onClick={() => handlePriority(2)} className="py-3 font-bold text-red-400 hover:opacity-75 hover:bg-black-100 rounded-b-lg">Alta</button>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )
            }

            {
                isOpenCalendarModal && <Calendar selected={dateTask} setSelected={setDateTask} onClose={closeCalendarModal} />
            }
        </div>
    )
};
