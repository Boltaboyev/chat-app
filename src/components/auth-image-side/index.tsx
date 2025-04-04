import type {FC} from "react"

interface AuthImagePatternType {
    title: string
    subtitle: string
}

const AuthImagePattern: FC<AuthImagePatternType> = ({title, subtitle}) => {
    return (
        <div className="hidden lg:flex items-center justify-center bg-base-200">
            <div className="max-w-md text-center">
                <div className="grid grid-cols-3 gap-3 mb-5">
                    {Array.from({length: 9}).map((_, i) => (
                        <div
                            key={i}
                            className={`aspect-square h-[130px] w-[135px] rounded-2xl bg-primary/10 ${
                                i % 2 === 0 ? "animate-pulse" : ""
                            }`}
                        />
                    ))}
                </div>
                <div className="flex flex-col gap-[0] leading-[135%] text-center">
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <p className="text-base-content/60 text-sm">{subtitle}</p>
                </div>
            </div>
        </div>
    )
}

export default AuthImagePattern
