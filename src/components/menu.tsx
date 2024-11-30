'use client'

import { useState } from 'react'
import Link from 'next/link'

import Modal from './modal'
import Button from './button'

import PlusCircleFill from '../../public/PlusCircleFill.svg'
import LogOut from '../../public/BoxArrowRight.svg'
import ArrowDown from '../../public/ArrowDown.svg'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/store/useUserStore'
import { useApi } from '@/hooks/useApi'

export default function Menu() {
    const user = useUserStore(state => state.user)
    const userLogout = useUserStore(state => state.exit)
    const router = useRouter()
    const [isOpenModalLogout, setIsOpenModalLogout] = useState(false)

    const closeModalLogout = () => {
        setIsOpenModalLogout(false)
    }

    const openModalLogout = () => {
        setIsOpenModalLogout(true)
    }

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

    const handleLogout = () => {
        userLogout()
        router.push('/')
    }

    return (
        <nav className='w-[312px] fixed h-screen flex flex-col gap-9 bg-black-100 pt-[84px] pb-10 pl-8 pr-5 border-r border-white-100 border-opacity-5'>
            <button onClick={addList} className="h-[52px] w-fit flex items-center px-6 bg-white-100 text-black-100 font-bold gap-2 rounded-[30px] hover:opacity-80">
                <PlusCircleFill />
                Criar lista
            </button>

            <div className='flex flex-1 flex-col justify-between'>
                <div className='flex flex-col gap-7'>
                    <div className='flex items-center justify-between'>
                        <Link href={'/home'} className='text-2xl font-medium text-white-100 hover:text-purple-100'> Página inicial </Link>

                        <ArrowDown />
                    </div>

                    <Link href={'/label'} className='text-2xl font-medium text-white-100 hover:text-purple-100'>Etiquetas</Link>

                    <Link href={'#'} className='text-2xl font-medium text-white-100 hover:text-purple-100'>Perfil</Link>
                </div>

                <button onClick={openModalLogout} className='flex items-center gap-3 text-2xl font-medium text-white-100 hover:text-purple-100'>
                    <LogOut />
                    Sair
                </button>
            </div>

            {
                isOpenModalLogout && (
                    <Modal title="Você deseja sair?" onClose={closeModalLogout}>
                        <div className='flex gap-5 mx-auto'>
                            <Button variant='primary' onClick={handleLogout} className='bg-purple-300'>
                                Sair
                            </Button>

                            <Button variant='secondary' onClick={closeModalLogout} className='bg-transparent'>
                                Cancelar
                            </Button>
                        </div>
                    </Modal>
                )
            }
        </nav>
    )
}