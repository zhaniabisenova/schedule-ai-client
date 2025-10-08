import { useNavigate } from "react-router-dom"

export const NotificationsScreen = () => {
    const navigate = useNavigate()
return(<> 
NotificationsScreen Page
<button onClick={()=>{navigate('/login')} }>Логин </button>
<button onClick={()=>{navigate('/profile')} }>Профиль </button>
<button onClick={()=>{navigate('/admin')} }>Админ </button>
<button onClick={()=>{navigate('/')} }>Главная </button>
</>)
}