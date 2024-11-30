'use client'

import { useState } from "react";

import Calendar from "./calendar";

import CalendarIcon from "../../public/CalendarEvent.svg";
import CheckIcon from "../../public/Checked.svg";
import PriorityIcon from "../../public/ExclamationCircle.svg";
import UncheckIcon from "../../public/Unchecked.svg";
import PrioritySelect from "./prioritySelect";

export interface CardTaskProps {
    id: number
    name: string
    isChecked: boolean
    priority: number | null
    dateToComplete: Date | undefined
    toggleChecked: (id: number) => void
}

export default function CardTask({ id, name, isChecked, priority, dateToComplete, toggleChecked }: CardTaskProps) {

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

    const handlePriority = (value: number) => {
        setChangePriority((prev) => (prev === value ? null : value))
    }

    return (
        <div className={`flex justify-between p-5 border border-white-100 rounded-lg ${changeIsChecked && 'opacity-60'}`}>
            <div className="flex gap-2">
                {
                    changeIsChecked ?
                        <CheckIcon onClick={() => toggleChecked(id)} className="cursor-pointer hover:opacity-75" />
                        :
                        <UncheckIcon onClick={() => toggleChecked(id)} className="cursor-pointer hover:opacity-75" />
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

                            {
                                changeDateToComplete && changeDateToComplete.toLocaleDateString()
                            }
                        </button>

                        <div onClick={openPrioritySelect} className="relative flex gap-2 items-center pl-3 text-xs text-white-100 cursor-pointer">
                            <PriorityIcon />

                            {
                                changePriority !== null && priorityLabel[changePriority]
                            }

                            {
                                isOpenPrioritySelect && <PrioritySelect handlePriority={handlePriority} onClose={closePrioritySelect}/>
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
