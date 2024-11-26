'use client'

import { useEffect, useState } from "react";
import Image from "next/image";

import Menu from "@/app/components/menu";
import Button from "@/app/components/button";
import Calendar from "@/app/components/calendar";
import CardLabel from "@/app/components/cardLabel";
import CardTask, { CardTaskProps } from "@/app/components/cardTask";
import Modal from "@/app/components/modal";

import CalendarIcon from "../../../../public/CalendarEvent.svg";
import PriorityIcon from "../../../../public/ExclamationCircle.svg";
import EditIcon from "../../../../public/PencilSquare.svg";
import AddLabel from "../../../../public/PlusCircleFill.svg";
import StarFavorite from "../../../../public/Star.svg";
import StarFilled from "../../../../public/StarFilled.svg";
import DeleteIcon from "../../../../public/Trash.svg";

export default function List() {
    const [tasks, setTasks] = useState<CardTaskProps[]>()
    const [newTaskDate, setNewTaskDate] = useState<Date>()

    const [changeIsFavorited, setChangeIsFavorited] = useState<boolean>()

    const [isOpenCalendarModal, setIsOpenCalendarModal] = useState(false)
    const [isOpenAddLabelModal, setIsOpenAddLabelModal] = useState(false)
    const [isOpenDeleteListModal, setIsOpenDeleteListModal] = useState(false)

    const openCalendarModal = () => {
        setIsOpenCalendarModal(true)
    }

    const closeCalendarModal = () => {
        setIsOpenCalendarModal(false)
    }

    const openDeleteListModal = () => {
        setIsOpenDeleteListModal(true)
    }

    const closeDeleteListModal = () => {
        setIsOpenDeleteListModal(false)
    }

    const openAddLabelModal = () => {
        setIsOpenAddLabelModal(true)
    }

    const closeAddLabelModal = () => {
        setIsOpenAddLabelModal(false)
    }

    useEffect(() => {
        setTasks([{
            id: 1,
            name: "Rotina",
            isChecked: false,
            priority: 2,
            dateToComplete: undefined
        }, {
            id: 2,
            name: "Rotina",
            isChecked: false,
            priority: 2,
            dateToComplete: undefined
        }])
    }, [])

    return (
        <div className='min-h-screen flex bg-black-200'>
            <Menu />

            <main className='w-full max-h-screen ml-[312px] p-[60px] space-y-5'>
                <div className="space-y-5 m-0">
                    <div className="text-6xl">❤️</div>

                    <div className="flex justify-between items-end">
                        <h1 className="font-bold text-4xl text-white-100">Nova lista</h1>

                        <div className="flex gap-5">
                            <StarFavorite className="cursor-pointer hover:opacity-75 text-purple-300" />
                            <StarFilled className="cursor-pointer hover:opacity-75 text-purple-300" />

                            <EditIcon onClick={openAddLabelModal} className="cursor-pointer hover:opacity-75 text-purple-300" />
                            <DeleteIcon onClick={openDeleteListModal} className="cursor-pointer hover:opacity-75 text-purple-300" />
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 items-center">
                    <CardLabel name={"Book"} id={0} color="secondary" size="small" />

                    <AddLabel onClick={openAddLabelModal} className="size-7 cursor-pointer hover:opacity-75" />
                </div>

                <div className="flex flex-col gap-3 p-5 border border-white-100 rounded-lg">
                    <input type="text" placeholder="Criar nova tarefa" className="text-bold text-white-100 bg-transparent text-base placeholder:text-bold placeholder:text-white-100 placeholder:text-base outline-none" />

                    <div className="flex justify-between">
                        <div className="flex gap-3">
                            <button onClick={openCalendarModal} className="flex gap-2 items-center px-3 py-2 rounded-lg text-xs text-white-100 border border-white-100">
                                {newTaskDate ? newTaskDate.toLocaleDateString() : `Data de realização`}

                                <CalendarIcon />
                            </button>

                            <button className="flex gap-2 items-center px-3 py-2 rounded-lg text-xs text-white-100 border border-white-100">
                                Prioridade 
                                <PriorityIcon />
                            </button>
                        </div>

                        <button className="w-fit text-center px-[18px] py-[9.5px] text-sm text-white-100 bg-purple-300 rounded-lg">
                            Criar
                        </button>
                    </div>
                </div>

                {
                    tasks?.map((task, index) => (
                        <CardTask key={index} id={task.id} isChecked={task.isChecked} dateToComplete={task.dateToComplete} name={task.name} priority={task.priority} />
                    ))
                }
            </main>

            {
                isOpenCalendarModal && <Calendar selected={newTaskDate} setSelected={setNewTaskDate} onClose={closeCalendarModal} />
            }

            {
                isOpenDeleteListModal && (
                    <Modal title="Excluir lista" onClose={closeDeleteListModal}>
                        <p className="text-base text-black-200">Ao confirmar você excluirá a lista permanentemente. Deseja continuar?</p>

                        <div className="flex justify-center gap-5">
                            <Button>Confirmar</Button>

                            <Button onClick={closeDeleteListModal} variant="secondary">Cancelar</Button>
                        </div>
                    </Modal>
                )
            }

            {
                isOpenAddLabelModal && (
                    <Modal title="Adicionar etiqueta" onClose={closeAddLabelModal}>
                        <div className="flex gap-2 items-center">
                            <input type="checkbox" id="label1" name="label1" value={1} className="h-5 w-5" />

                            <label htmlFor="label1" className="font-bold text-black-200">Book</label>
                        </div>

                        <div className="flex justify-center gap-5">
                            <Button>Salvar</Button>
                        </div>
                    </Modal>
                )
            }
        </div>
    )
}