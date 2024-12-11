'use client'

import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useApi } from "@/hooks/useApi";

import Menu from "@/components/menu";
import Button from "@/components/button";
import CardLabel from "@/components/cardLabel";
import CardTask from "@/components/cardTask";
import EmojiPicker from "@/components/emojiPicker";
import Modal from "@/components/modal";
import Input from "@/components/input";

import EditIcon from "../../../../public/PencilSquare.svg";
import AddLabel from "../../../../public/PlusCircleFill.svg";
import StarFavorite from "../../../../public/Star.svg";
import StarFilled from "../../../../public/StarFilled.svg";
import DeleteIcon from "../../../../public/Trash.svg";
import CardNewTask from "./components/cardNewTask";
import { useUserStore } from "@/store/useUserStore";

interface ListProps {
    id: number
    name: string
    icon: string
    isFavorite: boolean
    labelOnList: {
        label: {
            id: number
            name: string
        }
    }[],
    task: {
        id: number
        dateToComplete: Date | undefined
        isChecked: boolean
        name: string
        priority: number | null
    }[]
}

interface LabelProps {
    id: number
    name: string
}

export default function List() {
    const { id } = useParams<{ id: string }>()

    const user = useUserStore((state) => state.user)
    const router = useRouter()

    const [newListName, setNewListName] = useState<string>("")
    const [list, setList] = useState<ListProps | null>(null)
    const [labels, setLabels] = useState<LabelProps[]>([])
    const [selectedLabels, setSelectedLabels] = useState<LabelProps[]>([])

    const [isOpenDeleteListModal, setIsOpenDeleteListModal] = useState<boolean>(false)
    const [isOpenEditListModal, setIsOpenEditListModal] = useState<boolean>(false)
    const [isOpenAddLabelModal, setIsOpenAddLabelModal] = useState<boolean>(false)
    const [isOpenEmojiPicker, setIsOpenEmojiPicker] = useState<boolean>(false)

    const filteredTasksChecked = Array.isArray(list?.task) ? list?.task?.filter(task => task.isChecked) : []
    const filteredTasksNotChecked = Array.isArray(list?.task) ? list?.task?.filter(task => !task.isChecked) : []

    const openModal = (setOpen: Dispatch<SetStateAction<boolean>>) => {
        setOpen(true)
    }

    const closeModal = (setClose: Dispatch<SetStateAction<boolean>>) => {
        setClose(false)
    }

    const handleListName = async () => {
        if (newListName.trim() && (newListName != list?.name)) {
            await useApi.editListName(Number(id), newListName)

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
        await useApi.updateIcon(Number(id), icon)

        setList(prevList => prevList &&
            ({
                ...prevList,
                icon
            })
        )

        closeModal(setIsOpenEmojiPicker)
    }

    const handleIsFavorited = async () => {
        await useApi.updateFavorite(Number(id))

        setList(prevList => prevList && ({
            ...prevList,
            isFavorite: !prevList?.isFavorite
        }))
    }

    const handleDeleteList = async () => {
        await useApi.deleteList(Number(id))

        router.push('/home')
    }

    const toggleSelection = (id: number, name: string) => {
        setSelectedLabels((prevSelected) => {
            const newSelected = [...prevSelected];
            const index = newSelected.findIndex((list) => list.id === id);

            if (index === -1) {
                // Se a lista não está selecionada, adiciona ela
                newSelected.push({ id, name });
            } else {
                // Se a lista está selecionada, remove ela
                newSelected.splice(index, 1);
            }

            return newSelected;
        });
    };

    const handleLabels = async () => {
        await useApi.updateLabels(Number(id), selectedLabels)

        setList((prevList) => {
            if (prevList) {
                return {
                    ...prevList,
                    labelOnList: selectedLabels,
                };
            }
            return prevList
        });

        closeModal(setIsOpenAddLabelModal)
    }

    const handleCreateNewTask = async (name: string, dateToComplete: Date | undefined, priority: number | null) => {
        const newTask = await useApi.createTask(Number(id), name, dateToComplete, priority)

        setList(prevList =>
            prevList ? {
                ...prevList,
                task: [...prevList.task, newTask]
            } : null
        )
    }

    const handleDeleteTask = async (taskId: number) => {
        // await useApi.deleteTask(taskId)

        setList(prevList =>
            prevList ? {
                ...prevList,
                task: prevList.task.filter(task => task.id !== taskId)
            } : list
        )
    }

    const getList = async () => {
        const response = await useApi.getList(Number(id))

        setList(response)
    }

    const getLabels = async () => {
        if (user) {
            const labels = await useApi.getAllLabels(user.id)

            console.log(labels)
            setLabels(labels)
        }
    }

    useEffect(() => {
        getList()

        getLabels()
    }, [])

    return (
        <div className='min-h-screen flex bg-black-200'>
            <Menu />

            <main className='w-full h-full ml-[312px] p-[60px] space-y-5'>
                <div className="space-y-5 m-0">
                    <div className="text-6xl cursor-pointer hover:opacity-80" onClick={() => openModal(setIsOpenEmojiPicker)}>
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

                <CardNewTask handleCreateNewTask={handleCreateNewTask} />

                {
                    filteredTasksNotChecked?.map((task, index) => (
                        <CardTask
                            key={index}
                            taskProperties={task}
                            handleDeleteTask={handleDeleteTask}
                        />
                    ))
                }

                {
                    filteredTasksChecked?.map((task, index) => (
                        <CardTask
                            key={index}
                            taskProperties={task}
                            handleDeleteTask={handleDeleteTask}
                        />
                    ))
                }
            </main>

            {
                isOpenEmojiPicker && <EmojiPicker handleIconList={handleIconList} onClose={() => closeModal(setIsOpenEmojiPicker)} />
            }

            {
                isOpenEditListModal && (
                    <Modal title="Editar lista" onClose={() => closeModal(setIsOpenEditListModal)}>
                        {/* <div onClick={() => openModal(setIsOpenEmojiPicker)} className="text-5xl cursor-pointer hover:opacity-80">{list?.icon}</div> */}

                        <Input type="text" value={setNewListName} label="Editar nome" placeholder={list ? list?.name : ''} />

                        <div className="flex justify-center gap-5">
                            <Button onClick={handleListName}>Salvar</Button>
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
                        {
                            labels.length > 0 ? (
                                <div>
                                    <form>
                                        {labels.map((label, index) => (
                                            <div key={index} className="flex gap-2 items-center">
                                                <input
                                                    type="checkbox"
                                                    id={`list-${label.id}`}
                                                    checked={selectedLabels.some((selected) => selected.id === label.id)}
                                                    onChange={() => toggleSelection(label.id, label.name)}
                                                    className="h-5 w-5"
                                                />
                                                <label htmlFor={`list-${label.id}`} className="font-bold text-black-200">
                                                    {label.name}
                                                </label>
                                            </div>
                                        ))}
                                    </form>

                                    <div className="flex justify-center">
                                        <Button onClick={handleLabels}>Salvar</Button>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-black-200 text-center">Não há etiquetas criadas!</p>
                            )
                        }
                    </Modal>
                )
            }

        </div>
    )
}