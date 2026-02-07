
import { useState } from 'react';
import '../App.css';
import {Link, useNavigate} from "react-router-dom"
import Toast from "../dashboard/components/toast"

function App({handleLogin}) {
    const [loading, setloading] = useState(false);
    const navigate = useNavigate()
const [toastText, settoastText] = useState(null);

      const [form, setForm] = useState({});
      const guestLoginHandler = (e)=>{
        setForm({
          email : "guest1@gmail.com",
          password : "guest_1_789"
        })
        handleSubmit(e,"guest")
      }
    const handleSubmit = async(e,userRole)=>{
        e.preventDefault()
setloading(true)
        await fetch("https://todo-app-7ffy.onrender.com/auth/signin", {
            method: "POST",
            headers : {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email : userRole == "guest" ? "guest1@gmail.com" : form.email,
                password : userRole == "guest" ? "guest_1_789" : form.password
            })
        }).then(res=> res.json()).then(data=>{
            setloading(false)
            settoastText(data.message)
            console.log(data.message);
            if(data.status === 201){
                localStorage.setItem("token", data.token)
                handleLogin(data.user)
            }
        })
    }
    return (
        <div className="App" style={{display : "flex", alignItems : "center", justifyContent : "center", height: "100vh"}}>
             <header style={{position : "fixed", top : "0", width : "100%"}}>
                <nav>

                <div className="logo"></div>
<div className="links">

                <Link to={"/"}>Home</Link>
                <button onClick={()=>navigate("/signup")} className="btn">Register</button>
</div>
                </nav>
            </header>
            <form onSubmit={(e)=>handleSubmit(e)} className='signin form'>
                <h1>Login</h1>
                  <input required onChange={(event)=>setForm({...form, email : event.target.value})} type="email" placeholder="Email" value={form.email}/>
                <input required min={6} onChange={(event)=>setForm({...form, password : event.target.value})} type="password" placeholder="Password" value={form.password}/>
                <button type="submit">{loading ? "Logging In..." : "Sign In"  }</button>
                <p>Don't have an account? <Link to="/signup">Sign Up</Link> <br />Or login as a <a onClick={(e)=>guestLoginHandler(e)} style={{cursor : "pointer"}}>Guest</a></p>
                <p></p>
            </form>
                        {
                            toastText && (
                                <Toast text={toastText}/>
                            )
                        }
        </div>
    );
}

export default App;
