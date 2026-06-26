import { create } from "zustand"
import api from "../lib/axios.js"

const useAuthStore = create((set)=>({
    authUser : null, 
    isCheckingAuth : true,
    checkAuth : async ()=>{
        try {
            const res = await api.get('/auth/check')
            set({authUser : res.data})
        } catch (error) {
            console.error("check auth error", error)
            set({authUser : null})
        }finally{
            set({isCheckingAuth : false})
        }
    }
}))

export default useAuthStore