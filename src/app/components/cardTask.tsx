'use client'
import Image from "next/image";

import CalendarIcon from "../../../public/CalendarEvent.svg";
import CheckIcon from "../../../public/Checked.svg";
import UncheckIcon from "../../../public/Unchecked.svg";
import PriorityIcon from "../../../public/ExclamationCircle.svg";
import Calendar from "./calendar";
import { useState } from "react";

interface CardTaskProps {
    id: number
    name: string
    isChecked: boolean
    priority: number
    dateToComplete: Date | undefined
}

export default function CardTask({ id, name, isChecked, priority, dateToComplete }: CardTaskProps) {
    const [dateTask, setDateTask] = useState<Date| undefined>(dateToComplete)
    const [check, SetCheck] = useState(isChecked)
    const [isOpenCalendarModal, setIsOpenCalendarModal] = useState(false)

    const openCalendarModal = () => {
        setIsOpenCalendarModal(true)
    }

    const closeCalendarModal = () => {
        setIsOpenCalendarModal(false)
    }

    const handleIsChecked = () => {
        SetCheck(!check)
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
                        <button className="flex gap-2 items-center px-3 text-xs text-white-100">
                            <Image src={PriorityIcon} alt="calendar icon" />
                            {priority}
                        </button>
                    </div>
                )
            }

            {
                isOpenCalendarModal && <Calendar selected={dateTask} setSelected={setDateTask} onClose={closeCalendarModal} />
            }
        </div>
    )
};
