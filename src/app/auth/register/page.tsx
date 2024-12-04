"use client"

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Input from "../../../components/input"
import Button from "../../../components/button";

import { useApi } from "../../../hooks/useApi";
import MessageError from "@/components/messageError";
import { useUserStore } from "@/store/useUserStore";

export default function Register() {
    const userCreate = useUserStore(state => state.setUser)
    const router = useRouter()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [errorMessage, setErrorMessage] = useState<string | null>()

    const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (password === confirmPassword) {
            try {
                const response = await useApi.register(username, email, password)
                
                userCreate(response)
                
                router.push('/home')
            } catch (error: any) {
                if (error.fieldErrors) {
                    const firstErrorKey = Object.keys(error.fieldErrors)?.[0]
                    setErrorMessage(error.fieldErrors[firstErrorKey]?.[0] || "Erro ao realizar login")
                } else {
                    setErrorMessage(error.message || "Erro inesperado. Tente novamente.")
                }
            }
        } else {
            setErrorMessage('Senhas não conferem!')
        }
    }

    return (
        <main className="bg-black-100 w-full min-h-screen flex items-center justify-center">
            <div className="w-[535px] flex flex-col gap-10 px-[42px] py-[60px] rounded-[20px] bg-white-50 bg-opacity-80">
                <h1 className="text-4xl text-purple-400 font-bold text-center">Cadastro</h1>

                <form onSubmit={handleRegister} className="flex flex-col items-center gap-10">
                    <Input label="Nome de usuário" type="text" placeholder="Informe seu username" value={setUsername} />

                    <Input label="E-mail" type="email" placeholder="Informe seu e-mail" value={setEmail} />

                    <Input label="Senha" type="password" placeholder="Informe sua senha" value={setPassword} />

                    <Input label="Confirmar senha" type="password" placeholder="Confirme sua senha" value={setConfirmPassword} />

                    {errorMessage && <MessageError message={errorMessage} />}

                    <Button variant="primary" type="submit">Cadastrar</Button>
                </form>

                <Link href={"/auth/login"} className="text-sm text-black-100 text-center underline hover:text-purple-300">Já possui uma conta? Ir para login</Link>
            </div>
        </main>
    )
}