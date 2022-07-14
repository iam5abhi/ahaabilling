import React from "react"
import NavBar from "../component/Navbar"
import { useNavigate } from "react-router"

const Home=()=>{
    const navigae =useNavigate()
    const inputHandler =()=>{
        navigae('/login')
   }
  return (
      <>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#"></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul class="navbar-nav ms-md-auto gap-2 ">
                    
                    <li class="nav-item ">
                        <button type="button" class="btn btn-success" aria-current="page" onClick={inputHandler}>Login</button>
                    </li>
            
                </ul>
            </div>
        </div>
    </nav>
    <div class="vh-100 d-flex justify-content-center align-items-center">
        <h2>Home Page</h2>
    </div>
      </>
  )
}

export default Home