import { Camera } from "lucide-react"
import Dock from "../components/Dock.jsx"
import useThemeStore from "../store/useThemeStore.js"
import { useState } from "react"

function Settings() {
    const theme = useThemeStore((state)=>state.theme)
    const themeArr = useThemeStore((state)=>state.themeArr)
    const storeSetTheme = useThemeStore((state)=>state.setTheme)

    const [isUploadingImage, setIsUploadingImage] = useState(false)

    return (
        <div className="w-full min-h-screen p-5 graph_paper_dotted">
            <div className="flex justify-center items-center border-b-2 mb-4">
                <h1 className="pl-2 corinthia-regular">Settings</h1>
            </div>
            <div className="grid grid-cols-1 divide-dashed divide-y-2 gap-5">
                <div className="grid grid-cols-1 gap-2 pb-4">
                    <p className="text-lg">Update Profile Photo</p>
                    <div className="flex justify-center items-center relative">
                        <div className="h-28 w-35 relative">
                            <img src="/images/android-chrome-192x192.png" alt="default profile pic" className="size-28 rounded-full border-2" />
                            <label htmlFor="image-picker">
                                <div className="btn absolute right-0 bottom-5">
                                    <Camera />
                                    <input id="image-picker" type="file" accept="image/*" className="hidden" onClick={()=>setIsUploadingImage(true)} />
                                </div>
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                         {isUploadingImage && <button className="btn w-24">done</button>}
                    </div>
                    </div>
                <div className="grid grid-cols-1 gap-2 pb-4">
                    <p className="text-lg">Choose Theme</p>
                    <div className="grid grid-cols-3 gap-2 lg:grid-cols-7">
                    {themeArr.map((t)=>{
                        return (
                            <button 
                                className="btn"
                                onClick={()=>storeSetTheme(t)}
                                disabled={t===theme}
                            >{t}</button>
                        )
                    })}
                    </div>
                </div>
            </div>
            <div className="h-30"></div>
            <Dock />
        </div>
    )
}

export default Settings