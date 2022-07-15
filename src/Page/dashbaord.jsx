import React from "react"
import { useNavigate } from "react-router"


const DashBoadrd  =()=>{
    const navigate =useNavigate()
    const logout =()=>{
        window.localStorage.removeItem('token')
        navigate('/login')
    }
    return(
        <>
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
                        <a className="nav-link " aria-current="page" href="/dashboad">Home</a>
                    </li>
                    <li className="nav-item ">
                        <a className="nav-link " aria-current="page" href="/additem">Add Item</a>
                    </li>
                    <li className="nav-item ">
                        <a className="nav-link " aria-current="page" href="/generatebill">Bill Generate</a>
                    </li>
                    <li className="nav-item ">
                        <a className="nav-link " aria-current="page" href="/listitem">List of Item</a>
                    </li>
                    <li className="nav-item ">
                        <a className="nav-link " aria-current="page" href="/report">Report</a>
                    </li>
                    <li className="nav-item ">
                        <button type="button" className="btn btn-success" aria-current="page" onClick={logout}>Logout</button>
                    </li>
            
                </ul>
            </div>
        </div>
    </nav>
    <div className="vh-100 d-flex justify-content-center align-items-center">
        <h2>Welcome to Dashboard</h2>
    </div>
  
        </>
    )
}


export default DashBoadrd