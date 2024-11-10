"use client"

import Link from "next/link";
import Input from "../../components/input"
import Button from "../../components/button";
import { FormEvent, useState } from "react";
import { useApi } from "../../hooks/useApi";

export default function Login () {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
           const response = await useApi.login(email, password)
        } catch (error) {
            console.log(error)
        }
    } 

    return (
        <main className="bg-black-100 w-full min-h-screen flex items-center justify-center">
            <div className="w-[535px] flex flex-col gap-10 px-[42px] py-[60px] rounded-[20px] bg-white-50 bg-opacity-80">
                <h1 className="text-4xl text-purple-400 font-bold text-center">Login</h1>

                <form onSubmit={handleLogin} className="flex flex-col items-center gap-10">
                    <Input label="E-mail" type="email" placeholder="Informe o e-mail cadastrado" value={setEmail}/>

                    <Input label="Senha" type="password" placeholder="Digite a senha cadastrada" value={setPassword}/>

                    <Button title="Entrar"/>
                </form>

                <Link href={"/auth/register"} className="text-sm text-black-100 text-center underline hover:text-purple-300">Ainda não tem login? Ir para cadastro.</Link>
            </div>
        </main>
    )
}