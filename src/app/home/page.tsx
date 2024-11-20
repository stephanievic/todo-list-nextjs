"use client"

import Menu from "../components/menu";
import Search from "../components/search"
import CardList from "../components/cardList";

import PerfilIcon from "../../../public/PerfilIconEx.png"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface List {
    icon: string
    title: string
    id: number
}

export default function Home() {
    const router = useRouter()
    const dateNow = new Date()


    const [searchList, setSearchList] = useState("")
    const [lists, setLists] = useState<List[]|undefined>()
    const [listsFavorites, setListsFavorites] = useState<List[]>()

    const addList = () => {
        router.push(`/list/1`)
    }

    useEffect(() => {
        setLists([
            { icon: "👩", title: "Rotina", id: 1 },
            { icon: "❤️", title: "Vida", id: 2 }
        ]),

        setListsFavorites([
            { icon: "👩", title: "Rotina", id: 1 },
            { icon: "❤️", title: "Vida", id: 2 }
        ])
    }, [])

    const searchFiltered = lists?.filter((list) => list.title.toLowerCase().includes(searchList.toLowerCase())) ?? []

    return (
        <div className='min-h-screen flex bg-black-200'>
            <Menu />

            <main className='w-full ml-[312px] p-[60px] space-y-20'>
                <div className="flex flex-col w-fit">
                    <div className="flex gap-5 items-center">
                        <Image src={PerfilIcon} alt="exemplo de foto de perfil" className="rounded-full" width={70} height={70} />
                        <h1 className="text-4xl text-white-100 font-bold">Olá, Stephanie 👋</h1>
                    </div>
                    <p className="ml-[92px] text-xl text-purple-100">Quarta-feira, {dateNow.toLocaleDateString()}</p>
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
                                        {searchFiltered?.map((search, index) =>(
                                            <CardList key={index} icon={search.icon} title={search.title} id={search.id} />
                                        ))}
                                    </div>
                                ):
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
                                                <CardList key={index} icon={listFavorite.icon} title={listFavorite.title} id={listFavorite.id}/>
                                            ))
                                        }
                                    </div>

                                </section> 

                                <section className="space-y-10">
                                    <h2 className="text-3xl font-medium text-white-100">Todas as suas listas</h2>
                                    <div className="flex flex-wrap gap-10">
                                        {
                                            lists?.map((list, index) => (
                                                <CardList key={index} icon={list.icon} title={list.title} id={list.id} />
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