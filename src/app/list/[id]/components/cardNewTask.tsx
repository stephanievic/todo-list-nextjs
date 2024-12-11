import { Dispatch, SetStateAction, useState } from "react";

import Calendar from "@/components/calendar";
import PrioritySelect from "@/components/prioritySelect";

import CalendarIcon from "../../../../../public/CalendarEvent.svg";
import PriorityIcon from "../../../../../public/ExclamationCircle.svg";

interface CardNewTaskProps {
    handleCreateNewTask: (name: string, dateToComplete: Date | undefined, priority: number | null) => void
}

export default function CardNewTask({ handleCreateNewTask }: CardNewTaskProps) {
    const priorityLabel = ['Baixa', 'Média', 'Alta']

    const [taskName, setTaskName] = useState<string>("Criar nova tarefa")
    const [taskDateToComplete, setTaskDateToComplete] = useState<Date | undefined>(undefined)
    const [taskPriority, setTaskPriority] = useState<number | null>(null)

    const [isOpenCalendarModal, setIsOpenCalendarModal] = useState(false)
    const [isOpenPrioritySelect, setIsOpenPrioritySelect] = useState(false)

    const openModal = (setOpen: Dispatch<SetStateAction<boolean>>) => {
        setOpen(true)
    }

    const closeModal = (setClose: Dispatch<SetStateAction<boolean>>) => {
        setClose(false)
    }

    const handlePriority = (value: number) => {
        setTaskPriority(value)
    }

    const handleCreateTask = () => {
        const task = {
            name: taskName ? taskName : 'Criar nova tarefa',
            dateToComplete: taskDateToComplete,
            priority: taskPriority
        }

        handleCreateNewTask(task.name, task.dateToComplete, task.priority)

        setTaskName("")
        setTaskDateToComplete(undefined)
        setTaskPriority(null)
    }

    return (
        <div className="z-0 flex flex-col gap-3 p-5 border border-white-100 rounded-lg">
            <input onChange={(e) => setTaskName(e.target.value)} type="text" placeholder="Criar nova tarefa" className="text-bold text-white-100 bg-transparent text-base placeholder:text-bold placeholder:text-white-100 placeholder:text-base outline-none" />

            <div className="flex justify-between">
                <div className="flex gap-3">
                    <button onClick={() => openModal(setIsOpenCalendarModal)} className="flex gap-2 items-center px-3 py-2 rounded-lg text-xs text-white-100 border border-white-100">
                        {taskDateToComplete ? taskDateToComplete.toLocaleDateString() : `Data de realização`}

                        <CalendarIcon />
                    </button>

                    <div onClick={() => openModal(setIsOpenPrioritySelect)} className="w-fit relative z-0 flex gap-2 items-center px-3 py-2 rounded-lg text-xs cursor-pointer text-white-100 border border-white-100">
                        {
                            taskPriority !== null ? priorityLabel[taskPriority] : 'Prioridade'
                        }

                        <PriorityIcon />

                        {
                            isOpenPrioritySelect && <PrioritySelect handlePriority={handlePriority} onClose={() => closeModal(setIsOpenPrioritySelect)} />
                        }
                    </div>
                </div>

                <button onClick={handleCreateTask} className="w-fit text-center px-[18px] py-[9.5px] text-sm text-white-100 bg-purple-300 rounded-lg hover:opacity-80">
                    Criar
                </button>
            </div>

            {
                isOpenCalendarModal && (
                    <Calendar
                        selected={taskDateToComplete}
                        setSelected={setTaskDateToComplete}
                        onClose={() => { closeModal(setIsOpenCalendarModal) }}
                    />
                )
            }
        </div>
    )
}