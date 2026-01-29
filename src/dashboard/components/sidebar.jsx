
import { useState } from 'react';
import '../../App.css';
import Toast from "./toast"
function App({setNote, user}) {
    const [dropdown, setdropdown] = useState(false);
const [toastText, settoastText] = useState(null);
const [colorsToggle, setcolorsToggle] = useState(false);
    
    const logout = ()=>{
        localStorage.removeItem("token");
        setTimeout(() => {
            settoastText("Logged out successfully")
            }, 3000);
        window.location.href = "/signin";
    }
    
    
    return (
        <div className='sidebar'>
            <div className="top">

            <button onClick={()=>setcolorsToggle(!colorsToggle)} className={`addNote ${colorsToggle ? "active": ""}`}><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
            <div className={`colors ${colorsToggle ? "active": ""}`}>
                <button onClick={()=>setNote({title : "",description : "", isPinned : false, color : "rgb(44, 44, 46)"})} style={{background : "rgb(44, 44, 46)"}}></button>
                <button onClick={()=>setNote({title : "",description : "", isPinned : false, color : "rgb(100, 30, 43)"})} style={{background : "rgb(100, 30, 43)"}}></button>
                <button onClick={()=>setNote({title : "",description : "", isPinned : false, color : "rgb(30, 58, 95)"})} style={{background : "rgb(30, 58, 95)"}}></button>
                <button onClick={()=>setNote({title : "",description : "", isPinned : false, color : "rgb(74, 44, 94)"})} style={{background : "rgb(74, 44, 94)"}}></button>
                <button onClick={()=>setNote({title : "",description : "", isPinned : false, color : "rgb(58, 77, 26)"})} style={{background : "rgb(58, 77, 26)"}}></button>
                <button onClick={()=>setNote({title : "",description : "", isPinned : false, color : "rgb(122, 61, 34)"})} style={{background : "rgb(122, 61, 34)"}}></button>
            </div>
            </div>

            <div className="userDropdown">
                <button onClick={()=>setdropdown(!dropdown)}>{user.firstName.split("")[0]}{user.lastName.split("")[0]}</button>
                {
                    dropdown &&
                
                <div className="dropdown">
                    <div>
                        <div className="userIcon">{user.firstName.split("")[0]}{user.lastName.split("")[0]}</div>
                        <h2>{user.firstName} {user.lastName} <br /> <span>{user.email}</span></h2>
                    </div>
                    <button onClick={logout}><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg> Log Out</button>
                </div>
                }
            </div>
           {
            toastText && (
                <Toast text={toastText}/>
            )
            }
        </div>
    );
}

export default App;
