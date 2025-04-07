import React, {useState} from "react"
import AuthImagePattern from "../../components/auth-image-side"

import {Eye, EyeOff, Loader2, Lock, Mail, MessageSquare} from "lucide-react"
import {Link, useNavigate} from "react-router-dom"
import {useAuthStore} from "../../store/useAuthStore"

interface FormData {
    email: string
    password: string
}

const SignIn = () => {
    const navigate = useNavigate()
    const {signIn, isLoginLoading} = useAuthStore()

    const [showPass, setShowPass] = useState<boolean>(false)
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
    })

    const loginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await signIn(formData)
    }

    return (
        <section className="h-screen grid lg:grid-cols-2">
            {/* left side */}
            <div className="flex items-center justify-center flex-col p-6 sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center gap-1">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                                <MessageSquare className="w-6 h-6 text-primary" />
                            </div>

                            <div className=" flex flex-col gap-[0] leading-[130%] mt-2">
                                <h1 className="text-2xl font-bold">
                                    Welcome Back
                                </h1>
                                <p className="text-base-content/60 text-sm">
                                    Sign in to your account
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* form */}
                <form
                    onSubmit={loginSubmit}
                    className="w-[75%] max-[500px]:w-[100%] flex flex-col gap-5">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">
                                Email
                            </span>
                        </label>
                        <div className="flex justify-start border p-[2px_10px] rounded-lg gap-2 items-center">
                            <Mail className="h-5 w-5 text-base-content/40" />
                            <input
                                required
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value,
                                    })
                                }
                                name="email"
                                type="email"
                                className="input w-full !outline-none !border-none !ring-0"
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">
                                Password
                            </span>
                        </label>
                        <div className="flex justify-between border p-[2px_10px] rounded-lg items-center">
                            <Lock className="h-5 w-5 text-base-content/40 mr-3" />
                            <input
                                required
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        password: e.target.value,
                                    })
                                }
                                type={`${showPass ? "text" : "password"}`}
                                className="input w-full !outline-none !border-none !ring-0"
                                placeholder="password"
                            />

                            <div
                                onClick={() => setShowPass(!showPass)}
                                className="cursor-pointer h-10 px-1 flex justify-center items-center">
                                {showPass ? (
                                    <EyeOff className="h-5 w-5 text-base-content/40" />
                                ) : (
                                    <Eye className="h-5 w-5 text-base-content/40" />
                                )}
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate("/")}
                        disabled={isLoginLoading}
                        type="submit"
                        className="btn btn-primary w-full">
                        {isLoginLoading ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                loading...
                            </>
                        ) : (
                            "Sign in"
                        )}
                    </button>
                </form>

                <div className="text-center mt-5">
                    <p className="text-base-content/60">
                        Don&apos;t have an account?{" "}
                        <Link to={"/sign-up"} className="link link-primary">
                            Create account
                        </Link>
                    </p>
                </div>
            </div>

            {/* right side */}
            <AuthImagePattern
                title="Welcome back!"
                subtitle="Sign in to continue your conversations and catch up with your messages."
            />
        </section>
    )
}

export default SignIn
