import {useChatStore} from "../../../store/useChatStore"
import {useEffect, useRef} from "react"

import ChatHeader from "../chat-header"
import MessageInput from "../message-input"
import MessageSkeleton from "../../skeleton/MessageSkeleton"
import {useAuthStore} from "../../../store/useAuthStore"
import {formatMessageTime} from "../../../lib/timeFormat"

const ChatContainer = () => {
    const {messages, getMessages, isMessagesLoading, selectedUser} =
        useChatStore()
    const {authUser} = useAuthStore()
    const messageEndRef = useRef(null)

    useEffect(() => {
        getMessages(selectedUser?._id!)
    }, [selectedUser?._id, getMessages])

    if (isMessagesLoading) {
        return (
            <div className="flex-1 flex flex-col overflow-auto">
                <ChatHeader />
                <MessageSkeleton />
                <MessageInput />
            </div>
        )
    }

    return (
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader />

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message: any) => (
                    <div
                        key={message._id}
                        className={`chat ${
                            message.senderId === authUser?._id
                                ? "chat-end"
                                : "chat-start"
                        }`}
                        ref={messageEndRef}>
                        <div className=" chat-image avatar">
                            <div className="size-10 rounded-full border">
                                <img
                                    src={
                                        message.senderId === authUser?._id
                                            ? authUser?.profilePic ||
                                              "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
                                            : selectedUser?.profilePic ||
                                              "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
                                    }
                                    alt="profile pic"
                                />
                            </div>
                        </div>
                        <div className="chat-header mb-1">
                            <time className="text-xs opacity-50 ml-1">
                                {formatMessageTime(message.createdAt)}
                            </time>
                        </div>
                        <div className="chat-bubble flex flex-col">
                            {message.image && (
                                <img
                                    src={message.image}
                                    alt="Attachment"
                                    className="sm:max-w-[200px] rounded-md mb-2"
                                />
                            )}
                            {message.text && <p>{message.text}</p>}
                        </div>
                    </div>
                ))}
            </div>

            <MessageInput />
        </div>
    )
}
export default ChatContainer
