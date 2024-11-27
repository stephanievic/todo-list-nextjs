'use client'

import { useEffect, useState } from "react";

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

interface ListProps {
    id: number
    userId: number
    name: string
    icon: string
    isFavorite: boolean
}

export interface TaskProps {
    id: number
    name: string
    isChecked: boolean
    priority: number | null
    dateToComplete: Date | undefined
}

export default function List() {
    const [list, setList] = useState<ListProps | null>(null)
    const [tasks, setTasks] = useState<TaskProps[] | null>(null)
    const [newTaskDate, setNewTaskDate] = useState<Date>()
    const [newTaskName, setNewTaskName] = useState<string>("Criar nova tarefa")
    const [newTaskPriority, setNewTaskPriority] = useState<number | null>()

    const [isOpenCalendarModal, setIsOpenCalendarModal] = useState<boolean>(false)
    const [isOpenDeleteListModal, setIsOpenDeleteListModal] = useState<boolean>(false)
    const [isOpenEditListModal, setIsOpenEditListModal] = useState<boolean>(false)
    const [isOpenAddLabelModal, setIsOpenAddLabelModal] = useState<boolean>(false)

    const filteredTasksChecked = tasks?.filter(task => task.isChecked)
    const filteredTasksNotChecked = tasks?.filter(task => !task.isChecked)

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

    const openEditListModal = () => {
        setIsOpenEditListModal(true)
    }

    const closeEditListModal = () => {
        setIsOpenEditListModal(false)
    }

    const handleIsFavorited = () => {
        setList(prevList => prevList && ({
            ...prevList,
            isFavorite: !prevList?.isFavorite
        }))
    }

    const handleToggleChecked = (id: number) => {        
        setTasks(prevTasks => prevTasks && prevTasks.map(task =>
            task.id === id ? { ...task, isChecked: !task.isChecked } : task
        ))
    }

    const handleCreateTask = () => {
        const task = {
            id: tasks ? tasks.length + 1 : 3,
            name: newTaskName,
            isChecked: false,
            priority: newTaskPriority ? newTaskPriority : null,
            dateToComplete: newTaskDate
        }

        setTasks(prevTasks => prevTasks && ([
            ...prevTasks,
            task
        ]))
    }

    useEffect(() => {

        setList({
            id: 1,
            userId: 123,
            name: "Rotina",
            icon: "❤️",
            isFavorite: true
        })

        setTasks([{
            id: 1,
            name: "Rotina",
            isChecked: true,
            priority: 2,
            dateToComplete: undefined
        }, {
            id: 2,
            name: "Teste",
            isChecked: false,
            priority: 2,
            dateToComplete: undefined
        }])
    }, [])

    return (
        <div className='min-h-screen flex bg-black-200'>
            <Menu />

            <main className='w-full h-full ml-[312px] p-[60px] space-y-5'>
                <div className="space-y-5 m-0">
                    <div className="text-6xl">{list?.icon}</div>

                    <div className="flex justify-between items-end">
                        <h1 className="font-bold text-4xl text-white-100">{list?.name}</h1>

                        <div className="flex gap-5">
                            {
                                list?.isFavorite ? (
                                    <StarFilled onClick={handleIsFavorited} className="cursor-pointer hover:opacity-75 text-purple-300" />
                                ) : (
                                    <StarFavorite onClick={handleIsFavorited} className="cursor-pointer hover:opacity-75 text-purple-300" />
                                )
                            }

                            <EditIcon onClick={openEditListModal} className="cursor-pointer hover:opacity-75 text-purple-300" />

                            <DeleteIcon onClick={openDeleteListModal} className="cursor-pointer hover:opacity-75 text-purple-300" />
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 items-center">
                    <CardLabel name={"Book"} id={0} color="secondary" size="small" iconSize="small" />

                    <AddLabel onClick={openAddLabelModal} className="cursor-pointer hover:opacity-75" />
                </div>

                <div className="flex flex-col gap-3 p-5 border border-white-100 rounded-lg">
                    <input onChange={(e) => setNewTaskName(e.target.value)} type="text" placeholder="Criar nova tarefa" className="text-bold text-white-100 bg-transparent text-base placeholder:text-bold placeholder:text-white-100 placeholder:text-base outline-none" />

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

                        <button onClick={handleCreateTask} className="w-fit text-center px-[18px] py-[9.5px] text-sm text-white-100 bg-purple-300 rounded-lg">
                            Criar
                        </button>
                    </div>
                </div>

                {
                    filteredTasksNotChecked?.map((task, index) => (
                        <CardTask
                            key={index}
                            id={task.id}
                            isChecked={task.isChecked}
                            dateToComplete={task.dateToComplete}
                            name={task.name}
                            priority={task.priority}
                            toggleChecked={handleToggleChecked}
                        />
                    ))
                }

                {
                    filteredTasksChecked?.map((task, index) => (
                        <CardTask
                            key={index}
                            id={task.id}
                            isChecked={task.isChecked}
                            dateToComplete={task.dateToComplete}
                            name={task.name}
                            priority={task.priority}
                            toggleChecked={handleToggleChecked}
                        />
                    ))
                }

                
            </main>

            {
                isOpenCalendarModal && <Calendar selected={newTaskDate} setSelected={setNewTaskDate} onClose={closeCalendarModal} />
            }

            {
                isOpenEditListModal && (
                    <Modal title="Editar lista" onClose={closeEditListModal}>
                        <div className="flex justify-center gap-5">
                            <Button>Salvar</Button>
                        </div>
                    </Modal>
                )
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