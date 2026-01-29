import './App.css';
import Home from "./landingPage/index"
import Login from "./landingPage/login"
import Signup from "./landingPage/signup"
import Dashboard from "./dashboard/index"
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
  const [userData, setuserData] = useState(null);
  const [loading, setloading] = useState(true);
 
 useEffect(() => {
  const token = localStorage.getItem("token");
  if(!token){
    setloading(false)
    return;
  }
        fetch("https://todo-app-7ffy.onrender.com/dashboard/authenticate", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res=>res.json()).then(data=>{
         setuserData(data.user)
    }).catch(()=>{
      localStorage.removeItem("token");
      setuserData(null);
    }).finally(() => setloading(false));;
 }, []);
 const handleLogin = (user)=>{
  setuserData(user)
}
  return (
    <div className="App">
      <BrowserRouter>
      {loading ? <div>Loading...</div> : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={userData ? <Navigate to="/dashboard"/> : <Login handleLogin={handleLogin}/> } />
          <Route path="/signup" element={<Signup handleLogin={handleLogin}/>} />
          <Route path="/dashboard" element={userData != null ? <Dashboard user={userData}/> : <Navigate to="/signin"/> } />
        </Routes>
      )}
      </BrowserRouter>
    </div>
  );
}

export default App;
