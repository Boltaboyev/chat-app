import {useAuthStore} from "../../store/useAuthStore"
import {Camera, Mail, User} from "lucide-react"

const ProfilePage = () => {
    const {authUser, imgUploadLoading, updatePhoto} = useAuthStore()

    const handleImageUpload = async (e: any) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append("image", file)
        updatePhoto(formData)
        console.log(formData, "form data");
        
    }

    return (
        <div className="max-w-xl m-auto mt-5 h-screen">
            <div className="bg-base-300 rounded-xl p-5 space-y-6">
                {/* avatar upload section */}
                <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                        <img
                            src={
                                authUser?.profilePic ||
                                "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
                            }
                            alt="Profile"
                            className="size-22 rounded-full object-cover border-4 "
                        />
                        <label
                            htmlFor="avatar-upload"
                            className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${
                                imgUploadLoading
                                    ? "animate-pluse pointer-events-none"
                                    : ""
                            }`}>
                            <Camera className="w-5 h-5 text-base-200" />
                            <input
                                type="file"
                                id="avatar-upload"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={imgUploadLoading}
                            />
                        </label>
                    </div>
                    <p className="text-sm text-zinc-400">
                        Click the camera icon to update your photo
                    </p>
                </div>

                <div className="space-y-3">
                    <div className="space-y-1.5">
                        <div className="text-sm text-zinc-400 flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Full Name
                        </div>
                        <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                            {authUser?.fullName}
                            {/* Otabek Boltaboyev */}
                        </p>
                    </div>

                    <div className="space-y-1.5">
                        <div className="text-sm text-zinc-400 flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            Email Address
                        </div>
                        <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                            {authUser?.email}
                            {/* otabek@mail.ru */}
                        </p>
                    </div>
                </div>

                <div className="bg-base-300 rounded-xl">
                    <h2 className="text-lg font-medium  mb-4">
                        Account Information
                    </h2>
                    <div className="space-y-3 text-sm">
                        <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                            <span>Member Since</span>
                            {/* <span>{authUser.createdAt?.split("T")[0]}</span> */}
                            04.04.2025
                        </div>
                        <div className="flex items-center justify-between py-2">
                            <span>Account Status</span>
                            <span className="text-green-500">Active</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProfilePage
