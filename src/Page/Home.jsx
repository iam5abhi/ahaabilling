import React from "react"
import NavBar from "../component/Navbar"
import { useNavigate } from "react-router"
import { Navigate } from "react-router-dom";

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
                            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#"></a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                            <ul className="navbar-nav ms-md-auto gap-2 ">
                                
                                <li className="nav-item ">
                                    <button type="button" className="btn btn-success" aria-current="page" onClick={inputHandler}>Login</button>
                                </li>
                        
                            </ul>
                        </div>
                    </div>
                </nav>
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