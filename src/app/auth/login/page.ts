import { cookies } from "next/headers"

export async function getToken() {
    const cookieStore = await cookies()
    const hasCookie = cookieStore.has('autToken')
    console.log('Cookie: ', hasCookie)
}