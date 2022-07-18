import React from "react";
import { NavLink } from "react-router-dom";
import './NavBar.css'
import { useNavigate } from 'react-router';
import {ToastContainer,toast} from 'react-toastify'



const Navigation = () => {
    const navigate =useNavigate()
    const localStorage  =window.localStorage.getItem('token')

    let activeStyle = {};
    

      const logout =()=>{
        toast.success('logout successfuuly')
        window.localStorage.removeItem('token')
        navigate('/login')
       
        
    }

  return (
    <>{
        !localStorage ?(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#"></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav ms-md-auto m-2">
                        <li className="nav-item">
                               <NavLink  className="logibcss" to="/"  style={({ isActive }) => isActive ? activeStyle : undefined}>Home</NavLink>
                        </li>
                         
                        <li className="nav-item ">
                               <NavLink className="logibcss" to="/login"  style={({ isActive }) => isActive ? activeStyle : undefined}>login</NavLink>
                        </li>
                
                    </ul>
                </div>
            </div>
        </nav>
        ):(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
              <a className="navbar-brand" href="#"></a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse justify-content-end"
                id="navbarNav"
              >
                <ul className="navbar-nav ms-md-auto gap-2 ">
                  <li className="nav-item ">
                          <NavLink  className="navbarCss" to="/dashboad"  style={({ isActive }) => isActive ? activeStyle : undefined}>Home</NavLink>
                  </li>
                  <li className="nav-item ">
                  <NavLink  className="navbarCss" to="/additem"  style={({ isActive }) => isActive ? activeStyle : undefined}>  Add Item</NavLink>
                  </li>
                  <li className="nav-item ">
                  <NavLink  className="navbarCss" to="/generatebill"  style={({ isActive }) => isActive ? activeStyle : undefined}>Bill Generate</NavLink>
                  </li>
                  <li className="nav-item ">
                  <NavLink  className="navbarCss" to="/listitem"  style={({ isActive }) => isActive ? activeStyle : undefined}> List of Item</NavLink>
                  </li>
                  <li className="nav-item ">
                  <NavLink  className="navbarCss" to="/report"  style={({ isActive }) => isActive ? activeStyle : undefined}> Report</NavLink>
                  </li>
                  <li className="nav-item ">
                    <button
                      type="button"
                      className="btn btn-success"
                      aria-current="page"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        )
    }
      <ToastContainer/>
    </>
  );
};

export default Navigation;
