import {create} from "zustand"
import toast from "react-hot-toast"
import {axiosInstance} from "../lib"
import {AxiosError} from "axios"

import {AuthUserType} from "../@types"

interface AuthType {
    authUser: AuthUserType | null
    isLoginLoading: boolean
    isSigninLoading: boolean
    isCheckingUserLoader: boolean
    signIn: (data: {email: string; password: string}) => Promise<void>
    signUp: (data: {
        fullName: string
        email: string
        password: string
    }) => Promise<void>
    checkUser: () => Promise<void>
}

export const useAuthStore = create<AuthType>((set) => ({
    authUser: null,
    isLoginLoading: false,
    isSigninLoading: false,
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
            toast.success("You have successfully signed in")
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

    signUp: async (data) => {
        set({isSigninLoading: true})
        try {
            await axiosInstance.post("auth/sign-up", data)
            toast.success("You have successfully signed up")
        } catch (error) {
            if (error instanceof AxiosError) {
                if (
                    error.response &&
                    error.response.data.message &&
                    error.response.data
                ) {
                    toast.error(
                        error.response.data.message ||
                            "Something went wrong, please try again"
                    )
                }
            }
        } finally {
            set({isSigninLoading: false})
        }
    },
}))
