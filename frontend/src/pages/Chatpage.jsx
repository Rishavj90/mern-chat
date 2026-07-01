import {ChevronLeft, Paperclip, Send} from "lucide-react"
import { Link } from "react-router-dom"

const Chatpage = () => {
  return (
    <div className="w-full h-screen p-5 graph_paper_dotted">
      <div className="flex items-center pb-2 border-b-2">
        <Link to="/">
          <ChevronLeft />
        </Link>
        <img src="/images/android-chrome-192x192.png" alt="pfp" className="size-10 rounded-full" />
        <p>name</p>
      </div>
      <div className="w-full flex justify-center items-end absolute left-0 bottom-0 p-5">
        <label htmlFor="send-file" className="mr-1">
          <div className="btn">
            <Paperclip />
            <input type="file" id="send-file" className="hidden" />
          </div>
        </label>
        
        <textarea placeholder="Message" className="textarea mr-1 md:w-1/2"></textarea>
        <button className="btn"><Send /></button>
      </div>
    </div>
  )
}

export default Chatpage
