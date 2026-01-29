
import { useState } from 'react';
import '../App.css';
import {Link, useNavigate} from "react-router-dom"
import Toast from "../dashboard/components/toast"

function App() {
    const navigate = useNavigate()
const [toastText, settoastText] = useState(null);

      const [form, setForm] = useState({});
    const handleSubmit = async(e)=>{
        e.preventDefault()

        await fetch("http://localhost:8000/auth/signin", {
            method: "POST",
            headers : {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email : form.email,
                password : form.password
            })
        }).then(res=> res.json()).then(data=>{
            settoastText(data.message)
            if(data.status === 201){
                localStorage.setItem("token", data.token)
                setTimeout(() => {
                }, 3000);
                window.location.href = "/dashboard"
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
                  <input onChange={(event)=>setForm({...form, email : event.target.value})} type="email" placeholder="Email" />
                <input onChange={(event)=>setForm({...form, password : event.target.value})} type="password" placeholder="Password" />
                <button type="submit">Sign In</button>
                <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </form>
            {
                            toastText && (
                                <Toast text={toastText}/>
                            )
                        }{
            
                            setTimeout(() => {
                                settoastText(null)
                            }, 8000)
                        }
        </div>
    );
}

export default App;
