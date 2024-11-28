"use client"

import Link from "next/link";
import Input from "../../components/input"
import Button from "../../components/button";
import { FormEvent, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { useRouter } from "next/navigation";

export default function Register () {
    const router = useRouter()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleRegister = async (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (password === confirmPassword) {
            try {
                const response = await useApi.register(username, email, password)

                router.push('/home')
            } catch (error) {
                console.log(error)
            }
        }
    } 

    return (
        <main className="bg-black-100 w-full min-h-screen flex items-center justify-center">
            <div className="w-[535px] flex flex-col gap-10 px-[42px] py-[60px] rounded-[20px] bg-white-50 bg-opacity-80">
                <h1 className="text-4xl text-purple-400 font-bold text-center">Cadastro</h1>

                <form onSubmit={handleRegister} className="flex flex-col items-center gap-10">
                    <Input label="Nome de usuário" type="text" placeholder="Informe seu username" value={setUsername}/>

                    <Input label="E-mail" type="email" placeholder="Informe seu e-mail" value={setEmail}/>

                    <Input label="Senha" type="password" placeholder="Informe sua senha" value={setPassword}/>

                    <Input label="Confirmar senha" type="password" placeholder="Confirme sua senha" value={setConfirmPassword}/>

                    <Button variant="primary" type="submit">Cadastrar</Button>
                </form>

                <Link href={"/auth/login"} className="text-sm text-black-100 text-center underline hover:text-purple-300">Já possui uma conta? Faça login.</Link>
            </div>
        </main>
    )
}