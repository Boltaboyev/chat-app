import {useChatStore} from "../../store/useChatStore"

import Sidebar from "../../components/home/sidebar"
import NoChatSelected from "../../components/home/no-chat-selected"
import ChatContainer from "../../components/home/chat-container"

const Home = () => {
    const {selectedUser} = useChatStore()

    return (
        <div className="h-screen bg-base-200">
            <div className="flex items-center justify-center pt-5 px-4">
                <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
                    <div className="flex h-full rounded-lg overflow-hidden">
                        <Sidebar />

                        {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home
