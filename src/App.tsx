import {useEffect} from "react"
import {Route, Routes} from "react-router-dom"
import {Toaster} from "react-hot-toast"
import {Loader} from "lucide-react"

import {useAuthStore} from "./store/useAuthStore"

// components
import Home from "./pages/home"
import SignIn from "./pages/sign-in"
import SignUp from "./pages/sign-up"
import ProfilePage from "./pages/profile"
import Settings from "./pages/settings"
import Navbar from "./components/navbar"
import {useThemeStore} from "./store/useThemeStore"

const App = () => {
    const {checkUser, isCheckingUserLoader, authUser} = useAuthStore()
    const {theme} = useThemeStore()

    useEffect(() => {
        checkUser()
    }, [checkUser])

    if (!isCheckingUserLoader) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader className="size-10 animate-spin" />
            </div>
        )
    }

    return (
        <main data-theme={theme}>
            <Toaster position="top-center" reverseOrder={false} />
            {authUser ? <Navbar /> : null}

            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/sign-in" element={<SignIn />} />

                <Route path="/sign-up" element={<SignUp />} />

                <Route path="/settings" element={<Settings />} />

                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </main>
    )
}

export default App
