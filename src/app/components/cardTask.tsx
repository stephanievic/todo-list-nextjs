'use client'

import { useState } from "react";

import Calendar from "./calendar";

import CalendarIcon from "../../../public/CalendarEvent.svg";
import CheckIcon from "../../../public/Checked.svg";
import PriorityIcon from "../../../public/ExclamationCircle.svg";
import UncheckIcon from "../../../public/Unchecked.svg";

export interface CardTaskProps {
    id: number
    name: string
    isChecked: boolean
    priority: number | null
    dateToComplete: Date | undefined
}

export default function CardTask({ id, name, isChecked, priority, dateToComplete }: CardTaskProps) {
    const [changeIsChecked, setChangeIsChecked] = useState<boolean>(isChecked)
    const [changePriority, setChangePriority] = useState<number | null>(priority)
    const [changeDateToComplete, setChangeDateToComplete] = useState<Date | undefined>(dateToComplete)

    const priorityLabel = ['Baixa', 'Média', 'Alta']

    const [isOpenCalendarModal, setIsOpenCalendarModal] = useState<boolean>(false)
    const [isOpenPrioritySelect, setIsOpenPrioritySelect] = useState<boolean>(false)

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
        setChangeIsChecked(!changeIsChecked)
    }

    const handlePriority = (value: number) => {
        setChangePriority(value)

        closePrioritySelect()
    }

    return (
        <div className={`flex justify-between p-5 border border-white-100 rounded-lg ${changeIsChecked && 'opacity-60'}`}>
            <div className="flex gap-2">
                {
                    changeIsChecked ?
                        <CheckIcon onClick={handleIsChecked} className="cursor-pointer hover:opacity-75" />
                        :
                        <UncheckIcon onClick={handleIsChecked} className="cursor-pointer hover:opacity-75" />
                }
                {
                    changeIsChecked ? (
                        <h1 className="text-bold text-white-100 bg-transparent text-base line-through">{name}</h1>
                    ) : (
                        <input type="text" placeholder={name} className="text-bold text-white-100 bg-transparent text-base placeholder:text-bold placeholder:text-white-100 placeholder:text-base outline-none" />
                    )
                }
            </div>

            {
                !changeIsChecked && (
                    <div className="flex divide-x divide-solid">
                        <button onClick={openCalendarModal} className="flex gap-2 items-center px-3 text-xs text-white-100">
                            <CalendarIcon />
                            {changeDateToComplete && changeDateToComplete.toLocaleDateString()}
                        </button>

                        <div onClick={openPrioritySelect} className="w-20 relative flex gap-2 items-center px-3 text-xs text-white-100 cursor-pointer">
                            <PriorityIcon />
                            {changePriority !== null && priorityLabel[changePriority]}

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
                isOpenCalendarModal && <Calendar selected={changeDateToComplete} setSelected={setChangeDateToComplete} onClose={closeCalendarModal} />
            }
        </div>
    )
};
