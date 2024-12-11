'use client'

import { Dispatch, SetStateAction, useState } from "react";

import { useApi } from "@/hooks/useApi";

import Calendar from "./calendar";

import CalendarIcon from "../../public/CalendarEvent.svg";
import CheckIcon from "../../public/Checked.svg";
import PriorityIcon from "../../public/ExclamationCircle.svg";
import TrashIcon from "../../public/Trash.svg";
import UncheckIcon from "../../public/Unchecked.svg";
import PrioritySelect from "./prioritySelect";
import Button from "./button";
import Modal from "./modal";

export interface CardTaskProps {
    taskProperties: {
        id: number
        dateToComplete: Date | undefined
        isChecked: boolean
        name: string
        priority: number | null
    }
    handleDeleteTask: (id: number) => void
}

interface TaskProps {
    id: number
    dateToComplete: Date | undefined
    isChecked: boolean
    name: string
    priority: number | null
}

export default function CardTask({ taskProperties, handleDeleteTask }: CardTaskProps) {
    const [task, setTask] = useState<TaskProps>(taskProperties)

    const priorityLabel = ['Baixa', 'Média', 'Alta']

    const [isOpenCalendarModal, setIsOpenCalendarModal] = useState<boolean>(false)
    const [isOpenDeleteTaskModal, setIsOpenDeleteTaskModal] = useState<boolean>(false)
    const [isOpenPrioritySelect, setIsOpenPrioritySelect] = useState<boolean>(false)

    const openModal = (setOpen: Dispatch<SetStateAction<boolean>>) => {
        setOpen(true)
    }

    const closeModal = (setClose: Dispatch<SetStateAction<boolean>>) => {
        setClose(false)
    }

    const handleToggleChecked = async () => {
        await useApi.toggleChecked(task.id)

        setTask(prevTask => ({
            ...prevTask,
            isChecked: !task.isChecked
        }))
    }

    const handleDateTask = async (date: Date | undefined) => {
        await useApi.editDateToComplete(task.id, date)

        setTask(prevTask => ({
            ...prevTask,
            dateToComplete: date
        }))
    }

    const handlePriority = async (value: number) => {
        await useApi.editPriorityTask(task.id, value)

        setTask(prevTask => ({
            ...prevTask,
            priority: value
        }))
    }

    return (
        <div className={`flex justify-between p-5 border border-white-100 rounded-lg ${task.isChecked && 'opacity-60'}`}>
            <div className="flex gap-2">
                {
                    task.isChecked ?
                        <CheckIcon onClick={handleToggleChecked} className="cursor-pointer hover:opacity-75" />
                        :
                        <UncheckIcon onClick={handleToggleChecked} className="cursor-pointer hover:opacity-75" />
                }
                {
                    task.isChecked ? (
                        <h1 className="text-bold text-white-100 bg-transparent text-base line-through">{task.name}</h1>
                    ) : (
                        <input type="text" placeholder={task.name} className="text-bold text-white-100 bg-transparent text-base placeholder:text-bold placeholder:text-white-100 placeholder:text-base outline-none" />
                    )
                }
            </div>

            {
                !task.isChecked ? (
                    <div className="flex divide-x divide-solid">
                        <button onClick={() => openModal(setIsOpenCalendarModal)} className="flex gap-2 items-center px-3 text-xs text-white-100">
                            <CalendarIcon />

                            {
                                task.dateToComplete != undefined && new Date(task.dateToComplete).toLocaleDateString()
                            }
                        </button>

                        <div onClick={() => openModal(setIsOpenPrioritySelect)} className="relative flex gap-2 items-center pl-3 text-xs text-white-100 cursor-pointer">
                            <PriorityIcon />

                            {
                                task.priority !== null && priorityLabel[task.priority]
                            }

                            {
                                isOpenPrioritySelect && <PrioritySelect handlePriority={handlePriority} onClose={() => closeModal(setIsOpenPrioritySelect)} />
                            }
                        </div>
                    </div>
                ) : (
                    <div>
                        <TrashIcon onClick={() => openModal(setIsOpenDeleteTaskModal)} className="cursor-pointer hover:opacity-80"/>
                    </div>
                )
            }

            {
                isOpenCalendarModal && (
                    <Calendar
                        selected={task.dateToComplete}
                        setSelected={handleDateTask}
                        onClose={() => { closeModal(setIsOpenCalendarModal) }}
                    />
                )
            }

            {
                isOpenDeleteTaskModal && (
                    <Modal title="Excluir tarefa" onClose={() => closeModal(setIsOpenDeleteTaskModal)}>
                        <p className="text-black-200">Você deseja excluir esta tarefa?</p>

                        <div className="flex justify-center gap-5">
                            <Button onClick={() => handleDeleteTask(task.id)}>Excluir</Button>
                            <Button onClick={() => closeModal(setIsOpenDeleteTaskModal)} variant="secondary" >Cancelar</Button>
                        </div>
                    </Modal>
                )
            }
        </div>
    )
};
