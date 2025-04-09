import {create} from "zustand"
import toast from "react-hot-toast"
import {axiosInstance} from "../lib"
import {useAuthStore} from "./useAuthStore"
import {AxiosError} from "axios"

interface User {
    _id: string
    name: string
    fullName: string
    profilePic: string
}

interface Message {
    _id: string
    senderId: string
    receiverId: string
    text: string
    createdAt: string
}

interface MessageData {
    text: string
}

interface ChatStore {
    messages: Message[]
    users: User[]
    selectedUser: User | null
    isUsersLoading: boolean
    isMessagesLoading: boolean

    getUsers: () => Promise<void>
    getMessages: (userId: string) => Promise<void>
    sendMessage: (messageData: MessageData) => Promise<void>
    setSelectedUser: (selectedUser: User | null) => void
}

export const useChatStore = create<ChatStore>((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({isUsersLoading: true})
        try {
            const res = await axiosInstance.get("/message/users")
            set({users: res.data.data})
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
            set({isUsersLoading: false})
        }
    },

    getMessages: async (userId: string) => {
        set({isMessagesLoading: true})
        try {
            const res = await axiosInstance.get(`/message/${userId}`)
            set({messages: res.data.data})
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
            set({isMessagesLoading: false})
        }
    },

    sendMessage: async (messageData: MessageData) => {
        const {selectedUser, messages} = get()
        try {
            const res = await axiosInstance.post(
                `/message/send/${selectedUser?._id}`,
                messageData
            )
            set({messages: [...messages, res.data.data]})
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

    subscribeToMessages: () => {
        const {selectedUser} = get()
        if (!selectedUser) return

        const socket = useAuthStore.getState().socket

        socket!.on("newMessage", (newMessage) => {
            const isMessageSentFromSelectedUser =
                newMessage.senderId === selectedUser._id
            if (!isMessageSentFromSelectedUser) return

            set({
                messages: [...get().messages, newMessage],
            })
        })
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket
        socket!.off("newMessage")
    },

    setSelectedUser: (selectedUser: User | null) => set({selectedUser}),
}))
