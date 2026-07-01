import { useState, useEffect } from "react"
import Dock from "../components/Dock.jsx"
import api from "../lib/axios.js"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
function Homepage() {
    const [user, setUser] = useState([])
    useEffect(()=>{
        async function getUser(){
            try {
                const res = await api.get('/msg/users')
                setUser(res.data)
            } catch (error) {
                console.error("error in getting users",error)
                toast.error("sorry! something went wrong.")
            }
        }
        getUser()
    }, [])

    return (
        <div className="w-full h-screen p-5 graph_paper_dotted">
            <div className="flex justify-center items-center border-b-2 mb-5">
                <img src="/images/android-chrome-512x512.png" alt="cat logo" className="size-10" />
                <h1 className="pl-2 corinthia-regular">La Chaton Fat</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
                {user.map((u)=>{
                    return(
                        <Link to={`/${u._id}`}>
                            <div key={u._id} className="w-full p-2 flex items-center rounded-2xl hover:bg-(--color-primary)">
                                <img src="/images/android-chrome-512x512.png" alt="profile pic" className="size-10 mr-2 rounded-full" />
                                <p>{u.first_name} {u.last_name}</p>
                            </div>
                        </Link>
                    )
                })}
            </div>
            <div className="h-30"></div>
            <Dock />
            
        </div>
    )
}

export default Homepage