import React from "react"
import NavBar from "../component/Navbar"
import { useNavigate } from "react-router"
import { Navigate } from "react-router-dom";
import Navigation from "../component/Navbar";

const Home=()=>{
    const navigae =useNavigate()
    const localStorage  =window.localStorage.getItem('token')
    const inputHandler =()=>{
        navigae('/login')
   }
  return (
      <>
      {
          !localStorage ? (
             <div>
                      <Navigation/>    
                <div className="vh-100 d-flex justify-content-center align-items-center">
                    <h2>Home Page</h2>
                </div>
             </div>
          ):(
            <Navigate to ="/dashboad"/>
          )
      }
     
      </>
  )
}

export default Home