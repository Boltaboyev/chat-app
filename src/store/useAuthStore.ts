import {create} from "zustand"
import toast from "react-hot-toast"
import {axiosInstance} from "../lib"
import {AxiosError} from "axios"

import {AuthUserType} from "../@types"

interface AuthType {
    authUser: AuthUserType | null
    isLoginLoading: boolean
    isCheckingUserLoader: boolean
    signIn: (data: {email: string; password: string}) => Promise<void>
    checkUser: () => Promise<void>
}

export const useAuthStore = create<AuthType>((set) => ({
    authUser: null,
    isLoginLoading: false,
    isCheckingUserLoader: false,

    checkUser: async () => {
        set({isCheckingUserLoader: true})
        try {
            const res = await axiosInstance.get("/auth/check")
            set({authUser: res.data.user})
        } catch (error) {
            if (error instanceof AxiosError) {
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.message
                ) {
                    toast.error(error.response.data.message)
                }
            }
        } finally {
            set({isCheckingUserLoader: true})
        }
    },

    signIn: async (data) => {
        set({isLoginLoading: true})
        try {
            const res = await axiosInstance.post("/auth/sign-in", data)
            set({
                authUser: res.data.user,
                isLoginLoading: false,
            })
        } catch (error) {
            if (error instanceof AxiosError) {
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.message
                ) {
                    toast.error(error.response.data.message)
                }
            }
            set({isLoginLoading: false})
        } finally {
            set({isLoginLoading: false})
        }
    },
}))
