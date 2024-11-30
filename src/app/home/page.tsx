"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import Menu from "@/components/menu";
import Search from "@/components/search"
import CardList from "@/components/cardList";

import PerfilIcon from "../../../public/PerfilIconEx.png";
import { useUserStore } from "@/store/useUserStore";
import { useApi } from "@/hooks/useApi";

interface List {
    icon: string
    name: string
    id: number
}

export default function Home() {
    const user = useUserStore((state) => state.user)
    const router = useRouter()

    const dateNow = new Date()
    const weekdayOfToday = dateNow.toLocaleDateString('pt-BR', { weekday: 'long' })

    const [searchList, setSearchList] = useState("")
    const [lists, setLists] = useState<List[] | undefined>()
    const [listsFavorites, setListsFavorites] = useState<List[]>()

    const addList = async () => {
        try {
            if (user) {
                const { id } = await useApi.createList('Nova Lista', user.id, '👩')

                router.push(`/list/${id}`)
            }
        } catch (error: any) {
            if (error.fieldErrors) {
                const firstErrorKey = Object.keys(error.fieldErrors)?.[0]
                alert(error.fieldErrors[firstErrorKey]?.[0] || "Erro ao realizar login")
            } else {
                alert(error.message || "Erro inesperado. Tente novamente.")
            }
        }
    }

    const setAllLists = async () => {
        if (user) {
            const response = await useApi.getAllLists(user?.id)

            setLists(response)
        }
    }

    const setFavoritesLists = async () => {
        if (user) {
            const response = await useApi.getFavoritesLists(user?.id)

            setListsFavorites(response)
        }
    }

    useEffect(() => {
        setFavoritesLists()
        setAllLists()
    }, [])

    const searchFiltered = lists?.filter((list) => list.name.toLowerCase().includes(searchList.toLowerCase())) ?? []

    return (
        <div className='min-h-screen flex bg-black-200'>
            <Menu />

            <main className='w-full ml-[312px] p-[60px] space-y-20'>
                <div className="flex flex-col w-fit">
                    <div className="flex gap-5 items-center">
                        <Image src={user?.photo ? user.photo : PerfilIcon} alt="exemplo de foto de perfil" className="rounded-full" width={70} height={70} />
                        <h1 className="text-4xl text-white-100 font-bold">Olá, {user?.name} 👋</h1>
                    </div>
                    <p className="ml-[92px] text-xl text-purple-100">{weekdayOfToday}, {dateNow.toLocaleDateString()}</p>
                </div>

                <div className="flex gap-6 items-center justify-center">
                    <Search placeholder="Buscar lista" addItem={addList} searchItem={setSearchList} />
                </div>

                {
                    searchList.length > 0 ? (
                        <div>
                            {
                                searchFiltered?.length > 0 ? (
                                    <div className="text-white-100">
                                        {searchFiltered?.map((search, index) => (
                                            <CardList key={index} icon={search.icon} title={search.name} id={search.id} />
                                        ))}
                                    </div>
                                ) :
                                    (
                                        <div >
                                            <p className="text-purple-200">Não foi encontrada nenhuma lista com este nome.</p>
                                        </div>
                                    )
                            }
                        </div>

                    ) :
                        (
                            <div className="space-y-20">
                                <section className="space-y-10">
                                    <h2 className="text-3xl font-medium text-white-100">Listas Favoritadas</h2>
                                    <div className="flex flex-wrap gap-10">
                                        {
                                            listsFavorites?.map((listFavorite, index) => (
                                                <CardList key={index} icon={listFavorite.icon} title={listFavorite.name} id={listFavorite.id} />
                                            ))
                                        }
                                    </div>

                                </section>

                                <section className="space-y-10">
                                    <h2 className="text-3xl font-medium text-white-100">Todas as suas listas</h2>
                                    <div className="flex flex-wrap gap-10">
                                        {
                                            lists?.map((list, index) => (
                                                <CardList key={index} icon={list.icon} title={list.name} id={list.id} />
                                            ))
                                        }
                                    </div>
                                </section>
                            </div >

                        )
                }
            </main >
        </div >
    )
}