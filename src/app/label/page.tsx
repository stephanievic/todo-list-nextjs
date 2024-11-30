'use client'

import { useEffect, useState } from "react"

import CardLabel from "@/components/cardLabel"
import Menu from "@/components/menu"
import Search from "@/components/search"

interface Label {
    name: string
    id: number
}

export default function Label () {
    const [labels, setLabels] = useState<Label[]>()
    const [searchLabel, setSearchLabel] = useState("")

    useEffect (() => {
        setLabels([
            { name: "Book", id: 1 },
            { name: "Week", id: 2 },
            { name: "Life", id: 3 }
        ])
    }, [])

    const addLabel = () => {
        //a ser implentado 
    }

    const searchFiltered = labels?.filter((label) => label.name.toLowerCase().includes(searchLabel.toLowerCase())) ?? []

    return (
        <div className='min-h-screen flex bg-black-200'>
            <Menu/>

            <main className='w-full ml-[312px] p-[60px] space-y-20' >
                <div className="flex gap-6 items-center justify-center">
                    <Search placeholder="Buscar etiqueta" addItem={addLabel} searchItem={setSearchLabel} />
                </div>

                {
                    searchLabel.length > 0 ? (
                        <div>
                            {
                                searchFiltered?.length > 0 ? (
                                    <div className="text-white-100">
                                        {searchFiltered?.map((search, index) =>(
                                            <CardLabel key={index} name={search.name} id={search.id}/>
                                        ))}
                                    </div>
                                ):
                                (
                                    <div >
                                        <p className="text-purple-200">Não foi encontrada nenhuma etiqueta com este nome.</p>
                                    </div>
                                )
                            }
                        </div>
                        
                    ) :
                        (
                            <section className="space-y-10">
                                <div className="flex flex-wrap gap-10">
                                    {
                                        labels?.map((label, index) => (
                                            <CardLabel key={index} name={label.name} id={label.id}/>
                                        ))
                                    }
                                </div>
                            </section>

                        )
                }

            </main>
        </div>
    )
}