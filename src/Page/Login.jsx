import React,{useState} from "react";
import { useNavigate } from "react-router";
import {ToastContainer,toast} from 'react-toastify'
import axios from 'axios'
import BaseUrl from "../config/BaseUrl";


const Login =()=>{
    const navigae =useNavigate()
    const [userlogin,setuserlogin] =useState({email:'',password:''})
    const datahandler =()=>{
         navigae('/')
    }
    const inputHandler =(event)=>{
        setuserlogin((preState)=>({
            ...preState,
            [event.target.name]:event.target.value
        }))
    }

    const handleSubmit =(e)=>{
        const {email,password} =userlogin
         if(!email || !password){
             toast.error('All field required',{
              position: toast.POSITION.TOP_CENTER,
              autoClose:3000,
              theme: "colored"
             })
         }
         axios.post(`${BaseUrl.url}/login`,userlogin)
         .then((res)=>{
             window.localStorage.setItem("token",res.data.token)
             toast.success('Login Sucessfully',{
                position: toast.POSITION.TOP_CENTER,
                autoClose:1500,
                theme: "colored"
             })
             navigae('/dashboad')
         })
    }
    
  


    return(
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
                        <button type="button" class="btn btn-success" aria-current="page" onClick={datahandler} >Home</button>
                    </li>
            
                </ul>
            </div>
        </div>
    </nav>
    <div className="container border mt-4 w-25 p-3">
  <h3 className="text-center">Login</h3>
  <form onSubmit={handleSubmit} autoComplete="off">
    <div className="mb-3 mt-3">
      <label htmlFor="email" className="form-label">Email:</label>
      <input type="email" className="form-control" id="email" placeholder="Enter email"   name="email" onChange={inputHandler}/>
    </div>
    <div className="mb-3">
      <label htmlFor="pwd" className="form-label">Password:</label>
      <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="password"   onChange={inputHandler} />
    </div>
    <div className="form-check mb-3">
      <label className="form-check-label">
        <input className="form-check-input" type="checkbox" name="remember" /> Remember me
      </label>
    </div>
    <div className="button" />
    <button type="submit" className="btn btn-primary">Login</button>
  </form>
</div>

        </>
    )
}

export default Login