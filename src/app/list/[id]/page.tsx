'use client'

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import Menu from "@/components/menu";
import Button from "@/components/button";
import Calendar from "@/components/calendar";
import CardLabel from "@/components/cardLabel";
import CardTask from "@/components/cardTask";
import EmojiPicker from "@/components/emojiPicker";
import Modal from "@/components/modal";

import CalendarIcon from "../../../../public/CalendarEvent.svg";
import PriorityIcon from "../../../../public/ExclamationCircle.svg";
import EditIcon from "../../../../public/PencilSquare.svg";
import AddLabel from "../../../../public/PlusCircleFill.svg";
import StarFavorite from "../../../../public/Star.svg";
import StarFilled from "../../../../public/StarFilled.svg";
import DeleteIcon from "../../../../public/Trash.svg";
import PrioritySelect from "@/components/prioritySelect";

import { useApi } from "@/hooks/useApi";
import Input from "@/components/input";
import { useRouter } from "next/navigation";

interface ListProps {
    id: number
    name: string
    icon: string
    isFavorite: boolean
    labelOnList: {
        label: {
            name: string
        }
    }[],
    task: {
        id: number,
        dateToComplete: Date | undefined,
        isChecked: boolean,
        name: string,
        priority: number | null
    }[]
}

export default function List() {
    const router = useRouter()
    const listId = 6

    const [list, setList] = useState<ListProps | null>(null)
    const [newListName, setNewListName] = useState("")

    const [newTaskDate, setNewTaskDate] = useState<Date>()
    const [newTaskName, setNewTaskName] = useState<string>("Criar nova tarefa")
    const [newTaskPriority, setNewTaskPriority] = useState<number | null>(null)

    const priorityLabel = ['Baixa', 'Média', 'Alta']

    const [isOpenCalendarModal, setIsOpenCalendarModal] = useState<boolean>(false)
    const [isOpenDeleteListModal, setIsOpenDeleteListModal] = useState<boolean>(false)
    const [isOpenEditListModal, setIsOpenEditListModal] = useState<boolean>(false)
    const [isOpenAddLabelModal, setIsOpenAddLabelModal] = useState<boolean>(false)
    const [isOpenEmojiPicker, setIsOpenEmojiPicker] = useState<boolean>(false)
    const [isOpenPrioritySelect, setIsOpenPrioritySelect] = useState<boolean>(false)

    const filteredTasksChecked = list?.task?.filter(task => task.isChecked)
    const filteredTasksNotChecked = list?.task?.filter(task => !task.isChecked)

    const openModal = (setOpen: Dispatch<SetStateAction<boolean>>) => {
        setOpen(true)
    }

    const closeModal = (setClose: Dispatch<SetStateAction<boolean>>) => {
        setClose(false)
    }

    const handleNameList = async () => {
        if (newListName.trim() && (newListName != list?.name)) {
            await useApi.editListName(listId, newListName)

            setList(prevList =>
                prevList ? {
                    ...prevList,
                    name: newListName
                } : null
            )
        }

        closeModal(setIsOpenEditListModal)
    }

    const handleIconList = async (icon: string) => {
        await useApi.updateIcon(listId, icon)

        setList(prevList => prevList &&
            ({
                ...prevList,
                icon
            })
        )

        closeModal(setIsOpenEmojiPicker)
    }

    const handleIsFavorited = async () => {
        await useApi.updateFavorite(Number(listId))

        setList(prevList => prevList && ({
            ...prevList,
            isFavorite: !prevList?.isFavorite
        }))
    }

    const handleDeleteList = async () => {
        await useApi.deleteList(listId)

        router.push('/home')
    }

    const handleCreateTask = () => {
        // const task = {
        //     id: tasks ? tasks.length + 1 : 3,
        //     name: newTaskName,
        //     isChecked: false,
        //     priority: newTaskPriority ? newTaskPriority : null,
        //     dateToComplete: newTaskDate
        // }

        // setTasks(prevTasks => prevTasks && ([
        //     ...prevTasks,
        //     task
        // ]))
    }

    const getList = async () => {
        const response = await useApi.getList(Number(listId))

        console.log(response)
        setList(response)
    }

    useEffect(() => {
        getList()
    }, [])

    return (
        <div className='min-h-screen flex bg-black-200'>
            <Menu />

            <main className='w-full h-full ml-[312px] p-[60px] space-y-5'>
                <div className="space-y-5 m-0">
                    <div className="text-6xl" onClick={() => openModal(setIsOpenEmojiPicker)}>
                        {list?.icon}
                    </div>

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

                            <EditIcon onClick={() => openModal(setIsOpenEditListModal)} className="cursor-pointer hover:opacity-75 text-purple-300" />

                            <DeleteIcon onClick={() => openModal(setIsOpenDeleteListModal)} className="cursor-pointer hover:opacity-75 text-purple-300" />
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 items-center">
                    {
                        list?.labelOnList.map((labels, index) => (
                            <CardLabel key={index} name={labels.label.name} id={0} color="secondary" size="small" iconSize="small" />
                        ))
                    }

                    <AddLabel onClick={() => openModal(setIsOpenAddLabelModal)} className="cursor-pointer hover:opacity-75" />
                </div>

                <div className="flex flex-col gap-3 p-5 border border-white-100 rounded-lg">
                    <input onChange={(e) => setNewTaskName(e.target.value)} type="text" placeholder="Criar nova tarefa" className="text-bold text-white-100 bg-transparent text-base placeholder:text-bold placeholder:text-white-100 placeholder:text-base outline-none" />

                    <div className="flex justify-between">
                        <div className="flex gap-3">
                            <button onClick={() => openModal(setIsOpenCalendarModal)} className="flex gap-2 items-center px-3 py-2 rounded-lg text-xs text-white-100 border border-white-100">
                                {newTaskDate ? newTaskDate.toLocaleDateString() : `Data de realização`}

                                <CalendarIcon />
                            </button>

                            <button onClick={() => openModal(setIsOpenPrioritySelect)} className="relative flex gap-2 items-center px-3 py-2 rounded-lg text-xs text-white-100 border border-white-100">
                                {
                                    newTaskPriority !== null ? priorityLabel[newTaskPriority] : 'Prioridade'
                                }

                                <PriorityIcon />

                                {/* {
                                    isOpenPrioritySelect && <PrioritySelect handlePriority={handlePriority} onClose={() => closeModal(setIsOpenPrioritySelect)} />
                                } */}
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
                            taskProperties={task}
                        />
                    ))
                }

                {
                    filteredTasksChecked?.map((task, index) => (
                        <CardTask
                            key={index}
                            taskProperties={task}
                        />
                    ))
                }


            </main>

            {
                isOpenCalendarModal &&
                <Calendar
                    selected={newTaskDate}
                    setSelected={setNewTaskDate}
                    onClose={() => {
                        closeModal(setIsOpenCalendarModal)
                        handleDateTask(newTaskDate ? newTaskDate : null)
                    }} />
            }

            {
                isOpenEmojiPicker && <EmojiPicker handleIconList={handleIconList} onClose={() => closeModal(setIsOpenEmojiPicker)} />
            }

            {
                isOpenEditListModal && (
                    <Modal title="Editar lista" onClose={() => closeModal(setIsOpenEditListModal)}>
                        {/* <div onClick={() => openModal(setIsOpenEmojiPicker)} className="text-5xl cursor-pointer hover:opacity-80">{list?.icon}</div> */}

                        <Input type="text" value={setNewListName} label="Editar nome" placeholder={list ? list?.name : ''} />

                        <div className="flex justify-center gap-5">
                            <Button onClick={handleNameList}>Salvar</Button>
                        </div>
                    </Modal>
                )
            }

            {
                isOpenDeleteListModal && (
                    <Modal title="Excluir lista" onClose={() => closeModal(setIsOpenDeleteListModal)}>
                        <p className="text-base text-black-200">Ao confirmar você excluirá a lista permanentemente. Deseja continuar?</p>

                        <div className="flex justify-center gap-5">
                            <Button onClick={handleDeleteList}>Confirmar</Button>

                            <Button onClick={() => closeModal(setIsOpenDeleteListModal)} variant="secondary">Cancelar</Button>
                        </div>
                    </Modal>
                )
            }

            {
                isOpenAddLabelModal && (
                    <Modal title="Adicionar etiqueta" onClose={() => closeModal(setIsOpenAddLabelModal)}>
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