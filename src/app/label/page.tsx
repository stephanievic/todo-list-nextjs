'use client'

import { Dispatch, SetStateAction, useEffect, useState } from "react"

import CardLabel from "@/components/cardLabel"
import Menu from "@/components/menu"
import Search from "@/components/search"
import { useUserStore } from "@/store/useUserStore"
import { useApi } from "@/hooks/useApi"
import Modal from "@/components/modal"
import Input from "@/components/input"
import Button from "@/components/button"

interface Label {
    id: number
    name: string
}

export default function Label() {
    const user = useUserStore(state => state.user)

    const [addLabelName, setAddLabelName] = useState<string>("")

    const [labels, setLabels] = useState<Label[]>()
    const [searchLabel, setSearchLabel] = useState("")

    const [isOpenAddLabelModal, setIsOpenAddLabelModal] = useState(false)

    const openModal = (setOpen: Dispatch<SetStateAction<boolean>>) => {
        setOpen(true)
    }

    const closeModal = (setClose: Dispatch<SetStateAction<boolean>>) => {
        setClose(false)
    }

    const searchFiltered = labels?.filter((label) => label.name.toLowerCase().includes(searchLabel.toLowerCase())) ?? []

    const addLabel = async () => {
        if (addLabelName && user) {
            const response = await useApi.createLabel(addLabelName, user.id)

            setLabels(prevLabels => prevLabels && [
                ...prevLabels,
                response
            ])

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
                <div className="flex gap-6 items-center justify-center">
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