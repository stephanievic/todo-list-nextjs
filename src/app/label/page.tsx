'use client'

import { Dispatch, SetStateAction, useEffect, useState } from "react"

import Button from "@/components/button"
import CardLabel from "@/components/cardLabel"
import Input from "@/components/input"
import Menu from "@/components/menu"
import Modal from "@/components/modal"
import Search from "@/components/search"

import { useApi } from "@/hooks/useApi"
import { useUserStore } from "@/store/useUserStore"

interface Label {
    id: number
    name: string
}

export default function Label() {
    const user = useUserStore(state => state.user)
    
    const [labels, setLabels] = useState<Label[] | null>(null)
    const [searchLabel, setSearchLabel] = useState<string>("")
    const [addLabelName, setAddLabelName] = useState<string>("")

    const [isOpenAddLabelModal, setIsOpenAddLabelModal] = useState(false)

    const openModal = (setOpen: Dispatch<SetStateAction<boolean>>) => {
        setOpen(true)
    }

    const closeModal = (setClose: Dispatch<SetStateAction<boolean>>) => {
        setClose(false)
    }

    const searchFiltered = Array.isArray(labels) ? labels.filter((label) =>
        label.name.toLowerCase().includes(searchLabel.toLowerCase())) : []

    const addLabel = async () => {
        if (addLabelName.trim() && user) {
            const response: Label = await useApi.createLabel(addLabelName, user.id)

            setLabels(prevLabels =>
                prevLabels ? [...prevLabels, response] : null
            )

            closeModal(setIsOpenAddLabelModal)
        }
    }

    const getAllLabels = async () => {
        if (user) {
            const response = await useApi.getAllLabels(user.id)

            setLabels(response)
        }
    }

    useEffect(() => {
        getAllLabels()
    }, [])

    return (
        <div className='min-h-screen flex bg-black-200'>
            <Menu />

            <main className='w-full ml-[312px] p-[60px] space-y-20' >
                <div className="flex justify-center">
                    <Search placeholder="Buscar etiqueta" addItem={() => openModal(setIsOpenAddLabelModal)} searchItem={setSearchLabel} />
                </div>

                <section className="space-y-10">
                    {
                        searchLabel.length > 0 ? (
                            <div>
                                {
                                    searchFiltered?.length > 0 ? (
                                        <div className="flex flex-wrap gap-10">
                                            {searchFiltered?.map((search, index) => (
                                                <CardLabel key={index} name={search.name} id={search.id} />
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-purple-200">Não foi encontrada nenhuma etiqueta com este nome.</p>
                                    )
                                }
                            </div>

                        ) : (
                            <div className="flex flex-wrap gap-10">
                                {
                                    labels?.map((label, index) => (
                                        <CardLabel key={index} name={label.name} id={label.id} />
                                    ))
                                }
                            </div>
                        )
                    }
                </section>
            </main>

            {
                isOpenAddLabelModal && (
                    <Modal title="Criar etiqueta" onClose={() => closeModal(setIsOpenAddLabelModal)}>
                        <Input type="text" value={setAddLabelName} label="Nome" placeholder="Informe o nome da etiqueta" />

                        <div className="mx-auto">
                            <Button onClick={addLabel}>Criar</Button>
                        </div>
                    </Modal>
                )
            }
        </div>
    )
}