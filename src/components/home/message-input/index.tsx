import {useState} from "react"
import {useChatStore} from "../../../store/useChatStore"
import {Image, Send} from "lucide-react"

const MessageInput = () => {
    const [text, setText] = useState("")
    const {sendMessage} = useChatStore()

    const handleSendMessage = async (e: any) => {
        e.preventDefault()
        if (!text.trim()) return

        try {
            await sendMessage({
                text: text.trim(),
            })

            setText("")
        } catch (error) {
            console.error("Failed to send message:", error)
        }
    }

    return (
        <div className="p-4 w-full">
            <form
                onSubmit={handleSendMessage}
                className="flex items-center gap-2">
                <div className="flex-1 flex gap-2">
                    <input
                        type="text"
                        className="w-full input input-bordered rounded-lg input-sm sm:input-md"
                        placeholder="Type a message..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <input type="file" accept="image/*" className="hidden" />

                    <button
                        type="button"
                        className={`hidden sm:flex btn btn-circle text-emerald-500`}>
                        <Image size={20} />
                    </button>
                </div>
                <button
                    type="submit"
                    className={`btn btn-circle  text-emerald-500 flex justify-center items-center`}
                    disabled={!text.trim()}>
                    <Send size={20} />
                </button>
            </form>
        </div>
    )
}
export default MessageInput
