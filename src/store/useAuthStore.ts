import {create} from "zustand"
import {AxiosError} from "axios"
import toast from "react-hot-toast"
import {io, Socket} from "socket.io-client"

import {axiosInstance} from "../lib"
import {AuthUserType} from "../@types"

interface AuthType {
    authUser: AuthUserType | null
    isLoginLoading: boolean
    isSigninLoading: boolean
    isCheckingUserLoader: boolean
    imgUploadLoading: boolean
    signIn: (data: {email: string; password: string}) => Promise<void>
    signUp: (data: {
        fullName: string
        email: string
        password: string
    }) => Promise<void>
    checkUser: () => Promise<void>
    updatePhoto: (data: any) => Promise<void>
    logOut: () => Promise<void>
    onlineUsers: string[]
    socket: Socket | null
    connectSocket: () => void
    disconnectSocket: () => void
}

export const useAuthStore = create<AuthType>((set, get) => ({
    authUser: null,
    isLoginLoading: false,
    isSigninLoading: false,
    isCheckingUserLoader: false,
    imgUploadLoading: false,
    onlineUsers: [],
    socket: null,

    checkUser: async () => {
        set({isCheckingUserLoader: true})
        try {
            const res = await axiosInstance.get("/auth/check")
            set({authUser: res.data.data})
            get().connectSocket()
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
            get().connectSocket()
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
            get().connectSocket()
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

    updatePhoto: async (data) => {
        set({imgUploadLoading: true})
        try {
            const res = await axiosInstance.post("/auth/update-photo", data)
            set({authUser: res.data.data})
        } catch (error) {
        } finally {
            set({imgUploadLoading: false})
        }
    },

    logOut: async () => {
        try {
            await axiosInstance.post("/auth/logout")
            toast.success("Log out successful")
            set({authUser: null})
            get().disconnectSocket()
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
        }
    },

    connectSocket: () => {
        const {authUser} = get()
        if (!authUser || get().socket?.connected) return

        const socket = io("https://chat-app-bb-tai4.onrender.com", {
            query: {
                userId: authUser._id,
            },
        })
        socket.connect()

        set({socket: socket})

        socket.on("getOnlineUsers", (userIds) => {
            set({onlineUsers: userIds})
        })
    },
    disconnectSocket: () => {
        if (get().socket?.connected) get().socket!.disconnect()
    },
}))
