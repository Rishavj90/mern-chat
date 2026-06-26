import api from "../lib/axios.js"
import { ChevronRight, User} from "lucide-react"
import { useState } from "react"
import {Link, useNavigate} from "react-router-dom"
import toast from "react-hot-toast"
import useAuthStore from "../store/useAuthStore.js"

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const checkAuth = useAuthStore((state)=>state.checkAuth)

    async function sendData() {
        try {
            setIsLoading(true)
            const res = await api.post('/auth/login', {
                email : email,
                password : password
            })
            toast(`Welcome, ${res.data.first_name}!`, {
                icon: '❤️',
            })
            checkAuth()
            navigate("/")
        } catch (error) {
            console.error(error)
            toast.error(error.response.data.message)
        }   finally{
            setIsLoading(false)
        }
    }

    return (
        <div className="w-screen p-5 font-sans dot_pattern">
            <div className="flex justify-between items-center">
                <div className="flex">
                    <User />
                    <h2>LOGIN</h2>
                </div>
                <Link to="/signup">
                    <div className="btn btn-ghost" >
                        <h2>SIGNUP</h2>
                        <ChevronRight />
                    </div>
                </Link>
            </div>
            <div className="p-5 grid md:grid-cols-2 gap-4">
                <div>
                    <img 
                        src="/images/banner.jpg" 
                        alt="moon pic" 
                        className="rounded-lg mb-2" 
                    />
                </div>
                
                <div className="flex flex-col justify-center items-center">
                    <input 
                        type="text" 
                        placeholder="email" 
                        className="w-full lg:max-w-3/4 input mb-2"
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    <input 
                        type="text" 
                        placeholder="password" 
                        className="w-full lg:max-w-3/4 input mb-2"
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    <div className="w-full lg:max-w-3/4 flex justify-end items-center">
                        <button 
                            type="submit" 
                            className="btn"
                            onClick={sendData}
                            disabled={isLoading}
                        >
                            {isLoading? <span className="loading loading-dots loading-xs"></span> : "done"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login