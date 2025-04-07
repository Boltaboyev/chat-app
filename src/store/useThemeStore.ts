import {create} from "zustand"

interface ThemeType {
    theme: string
    setTheme: (theme: string) => void
}

export const useThemeStore = create<ThemeType>((set) => ({
    theme: localStorage.getItem("theme") || "dark",

    setTheme: (theme) => {
        set({theme})
        localStorage.setItem("theme", theme)
    },
}))
