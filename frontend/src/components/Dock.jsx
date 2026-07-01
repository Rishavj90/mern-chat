import { House, Settings } from "lucide-react"
import {useLocation, useNavigate} from "react-router-dom"

function Dock() {
    const location = useLocation()
    const navigate = useNavigate()
    
    return (
        <div className="dock">
            <button className={location.pathname==='/' ? 'dock-active' : ''} onClick={()=>navigate('/')}>
                <House />
            </button>
            
            <button className={location.pathname==='/settings' ? 'dock-active' : ''} onClick={()=>navigate('/settings')}>
                <Settings />
            </button>
        </div>
    )
}
export default Dock