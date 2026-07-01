import {ChevronLeft, Paperclip, Send} from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import api from "../lib/axios"
import useAuthStore from "../store/useAuthStore"

const Chatpage = () => {
  const authUser = useAuthStore((state)=>state.authUser)
  const [allMsg, setAllMsg] = useState([])
  const [chatReciever, setChatReciever] = useState({})
  const {chatId} = useParams()
  const [textMsg, setTextMsg] = useState("")

  async function sendMsg() {
    try {
      api.post(`/msg/send/${chatId}`, {
        text : textMsg
      })

    } catch (error) {
      toast.error("Internal Server Error")
      console.error("Message Send error", error)
    }
  }

  async function getAllMsg() {
    try {
      const msg = await api.get(`/msg/getmsg/${chatId}`)
      setAllMsg(msg.data)
    } catch (error) {
      toast.error("Internal Server Error")
      console.error("get All Msg error", error)
    }
  }
  
  useEffect(()=>{
    async function getUser(){
      try {
        const reciever = await api.get(`/msg/user/${chatId}`)
        setChatReciever(reciever.data)
      } catch (error) {
        toast.error("Internal Server Error")
        console.error("get Chat User error", error)
      }
    }
    getUser()
    getAllMsg()
  },[])

  return (
    <div className="w-full min-h-screen p-5 graph_paper_dotted">
      <div className="flex justify-center items-center pb-2 mb-5 border-b-2 relative">
        <Link to="/">
          <ChevronLeft className="mr-2 absolute left-0 top-5" />
        </Link>
        <img src="/images/android-chrome-192x192.png" alt="pfp" className="size-10 rounded-full mr-3" />
        <p className="corinthia-regular">{chatReciever.first_name} {chatReciever.last_name}</p>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {allMsg.map((msg)=>{
          return (
            <div className={`flex items-center ${msg.sender_id === authUser._id ? "justify-end" : ""}`}>
              <p>{msg.text}</p>
            </div>
          )
        })}
      </div>

      <div className="size-35"></div>

      <div className="w-full flex justify-center items-end absolute left-0 bottom-0 p-5">
        <label htmlFor="send-file" className="mr-1">
          <div className="btn">
            <Paperclip />
            <input type="file" id="send-file" className="hidden" />
          </div>
        </label>
        
        <textarea onChange={(e)=>setTextMsg(e.target.value)} placeholder="Message" className="textarea mr-1 md:w-1/2"></textarea>
        <button className="btn" onClick={()=>{
          sendMsg()
          getAllMsg()
        }} ><Send /></button>
      </div>
    </div>
  )
}

export default Chatpage
