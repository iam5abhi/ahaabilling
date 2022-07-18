import React,{useEffect} from "react"
import { useNavigate } from "react-router"
import { ToastContainer, toast } from 'react-toastify';
import Navigation from "../component/Navbar"


const DashBoadrd  =()=>{
    const loginSucess =()=>{
        toast.success('login sucessfully',{
            position: toast.POSITION.TOP_CENTER,
            autoClose:3000,
            theme: "colored"
           })
    }
  useEffect(()=>{
    loginSucess()
  },[])
    return(
        <>
    <Navigation/>
    <div className="vh-100 d-flex justify-content-center align-items-center">
        <h2>Welcome to Dashboard</h2>
    </div>
  <ToastContainer/>
        </>
    )
}


export default DashBoadrd