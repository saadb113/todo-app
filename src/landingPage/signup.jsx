
import { useState } from 'react';
import '../App.css';
import {Link,useNavigate} from "react-router-dom"
import Toast from "../dashboard/components/toast"

function App() {
    const navigate = useNavigate()
    const [toastText, settoastText] = useState(null);
    
    const [form, setForm] = useState({});
    const handleSubmit = async(e)=>{
        e.preventDefault()

        await fetch("https://todo-app-7ffy.onrender.com/auth/signup", {
            method: "POST",
            headers : {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName : form.firstName,
                lastName : form.lastName,
                email : form.email,
                password : form.password
            })
        }).then(res=> res.json()).then(data=>{
            settoastText(data.message)
            if(data.status === 201){

                setTimeout(() => {
                }, 8000);
                navigate("/signin")
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
                            <button onClick={()=>navigate("/signin")} className="btn">Login</button>
            </div>
                            </nav>
                        </header>
            <form onSubmit={(e)=>handleSubmit(e)} className='signin form'>
                <h1>Sign Up</h1>
                <input required onChange={(event)=>setForm({...form, firstName : event.target.value})} type="text" placeholder="First Name" />
                <input onChange={(event)=>setForm({...form, lastName : event.target.value})} type="text" placeholder="Last Name" />
                <input required onChange={(event)=>setForm({...form, email : event.target.value})} type="email" placeholder="Email" />
                <input required onChange={(event)=>setForm({...form, password : event.target.value})} type="password" placeholder="Password" />
                <button type="submit">Sign Up</button>
                <p>Already have an account? <Link to="/signin">Sign In</Link></p>
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
