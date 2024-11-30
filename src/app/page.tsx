'use client'

import { useUserStore } from "@/store/useUserStore"

import Login from "./auth/login/page"
import Home from "./home/page"

export default function Index() {
	const user = useUserStore((state) => state.user)

	if (user) {
		return (
			<Home />
		)
	} else {
		return (
			<Login />
		)
	}
}