export const useApi = {
    login: async (email: string, password: string) => {
        try {
            const response = await fetch("http://localhost:3001/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })

            const data = await response.json()

            return data.user

        } catch (error) {
            console.error(error)
        }
    },
    register: async (username: string, email: string, password: string) => {
        try {
            const response = await fetch("http://localhost:3001/user/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            })

            const data = await response.json()

            return data

        } catch (error) {
            console.error(error)
        }
    }
}