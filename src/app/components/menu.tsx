'use client'

import Image from 'next/image'
import Link from 'next/link'

import PlusCircleFill from '../../../public/PlusCircleFill.svg'
import LogOut from '../../../public/BoxArrowRight.svg'
import ArrowDown from '../../../public/ArrowDown.svg'
import { useState } from 'react'
import Modal from './modal'
import Button from './button'

export default function Menu() {
    const [isOpenModalLogout, setIsOpenModalLogout] = useState(false)

    const onClose = () => {
        setIsOpenModalLogout(false)
    }

    const handleLogout = () => {
        console.log('LOGOUT')
    }

    return (
        <nav className='w-[312px] fixed h-screen flex flex-col gap-9 bg-black-100 pt-[84px] pb-10 pl-8 pr-5 border-r border-white-100 border-opacity-5'>
            <button className="h-[52px] w-fit flex items-center px-6 bg-white-100 text-black-100 font-bold gap-2 rounded-[30px] hover:opacity-80"><Image src={PlusCircleFill} alt="plus circle icon" />
                Criar lista
            </button>

            <div className='flex flex-1 flex-col justify-between'>
                <div className='flex flex-col gap-7'>
                    <div className='flex items-center justify-between'>
                        <Link href={'/home'} className='text-2xl font-medium text-white-100 hover:text-purple-100'> Página inicial </Link>
                        <Image src={ArrowDown} alt='arrow down' />
                    </div>
                    <Link href={'/label'} className='text-2xl font-medium text-white-100 hover:text-purple-100'>Etiquetas</Link>
                    <Link href={'#'} className='text-2xl font-medium text-white-100 hover:text-purple-100'>Perfil</Link>
                </div>
                <button onClick={() => setIsOpenModalLogout(true)} className='flex items-center gap-3 text-2xl font-medium text-white-100 hover:text-purple-100'><Image src={LogOut} alt="Box Arrow Right" />
                    Sair
                </button>
            </div>

            {
                isOpenModalLogout && (
                    <Modal title="Você deseja sair?" onClose={onClose}>
                        <div className='space-x-5 mx-auto'>
                            <Button onClick={handleLogout} title='Sair' className='bg-purple-300'/>
                            <Button onClick={onClose} title='Cancelar' className='bg-transparent'/>
                        </div>
                    </Modal>
                )
            }
        </nav>
    )
}