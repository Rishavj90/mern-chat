import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Homepage from './pages/Homepage.jsx'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import { Toaster } from "react-hot-toast"
import Settings from './pages/Settings.jsx'
import useAuthStore from './store/useAuthStore.js'
import { useEffect } from 'react'
import useThemeStore from './store/useThemeStore.js'
import Chatpage from './pages/Chatpage.jsx'

function App() {
    const authUser = useAuthStore((state)=>state.authUser)
    const isCheckingAuth = useAuthStore((state)=>state.isCheckingAuth)
    const checkAuth = useAuthStore((state)=>state.checkAuth)

    const theme = useThemeStore((state)=>state.theme)

    useEffect(()=>{
        checkAuth()
    },[])

    if(isCheckingAuth && !authUser){
        return (
            <div className='h-screen flex items-center justify-center'>
                <span className="loading loading-dots loading-xs"></span>
            </div>
        )
    }

    return (
        <div  data-theme={theme}>
            <Toaster/>
            <Routes>
                <Route path="/" element={authUser ? <Homepage /> : <Navigate to={"/login"} />} />
                <Route path="/:chatId" element={authUser ? <Chatpage /> : <Navigate to={"/login"} />} />
                <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to={"/"} /> } />
                <Route path="/login" element={!authUser ?  <Login /> : <Navigate to={"/"} />} />
                <Route path="/settings" element={authUser ? <Settings /> : <Navigate to={"/login"} />} />
            </Routes>
        </div>
    )
}

export default App
