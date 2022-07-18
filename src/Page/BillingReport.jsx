import React,{useState,useEffect} from "react";
import axios from "axios";
import BaseUrl from "../config/BaseUrl";
import DataTable,{ createTheme } from 'react-data-table-component';
import { useNavigate } from "react-router-dom";
import {ToastContainer,toast} from 'react-toastify'



const customStyles = {
    row: {
        style: {
            
        },
    },
    headCells: {
        style: {
            backgroundColor:" #F2F3F5",
            borderRight:'1px solid white',
            paddingLeft:"60px"
        },
    },
    cells: {
        style: {
            paddingLeft:"60px",
            borderRight:'1px solid white',
        },
    },
};





const BillingReport =()=>{

    const navigate =useNavigate()




    const [loading,setloading] =useState(true)
    const [reportdata,setreportdata]=useState()

    const billingreport =()=>{
        axios.get(`${BaseUrl.url}/api/v2/bill/report`)
        .then((res)=>{
            setreportdata(res.data.reportdata)
            setloading(false)
            
        })
    }

    const billingreports =(id)=>{
        navigate(`/report/${id}`)
    }


    const deleteHandler =(id)=>{
      const filteredArray = reportdata.filter((data) => {
        return data._id != id;
      });
      setreportdata(filteredArray)
      axios.delete(`${BaseUrl.url}/api/v2/delete/report/${id}`)
      .then(res => {
        toast.success('delete data Sucessfully')
      })
      .catch(err => {
           toast.error(err.message)
      })
    }


    const printhandler =(id)=>{
       navigate(`/bill/${id}`)
    }


    const logout =()=>{
        window.localStorage.removeItem('token')
        navigate('/login')
    }


    const columns =[
        {
            name:'Date',
            selector: row => row.Date,
            sortable:true
        },
        {
            name:'Bill no',
            selector: row => row._id,
        },
        {
            name:'Amount',
            selector:row=>row.FinalBillAmount,
            sortable:true
        },
        {
            name:'cash'
        },
        {
            name:'Credit/Account'
        },
        {
            name:'User',
            selector:row=>"counter1"
        },
        {
            name:'Action',
            cell:(row)=><button className="btn btn-sm btn-primary" onClick={()=>{billingreports(row._id)}}>Edit</button>
        },

        {
            name:'Action',
            cell:(row)=><button className="btn btn-sm btn-danger" onClick={()=>{deleteHandler(row._id)}}>Delete</button>
        },


        {
          name:'Action',
          cell:(row)=><button className="btn btn-sm btn-success" onClick={()=>{printhandler(row._id)}}>Print</button>
        }


    ]


    useEffect(() => {
        billingreport()
    }, []);


     if(loading){
         return(
            <div>loading...</div>
         )
     }

    return(
        <>
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
                <a className="nav-link " aria-current="page" href="/dashboad">
                  Home
                </a>
              </li>
              <li className="nav-item ">
                <a className="nav-link " aria-current="page" href="/additem">
                  Add Item
                </a>
              </li>
              <li className="nav-item ">
                <a className="nav-link " aria-current="page" href="/generatebill">
                  Bill Generate
                </a>
              </li>
              <li className="nav-item ">
                <a className="nav-link " aria-current="page" href="/listitem">
                  List of Item
                </a>
              </li>
              <li className="nav-item ">
                <a className="nav-link " aria-current="page" href="/report">
                  Report
                </a>
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

        <div class="container-fluid">
          <h1 class="text-center"><b>Bill Wise Report</b></h1>
            <DataTable
                title="Sale Report"
                columns={columns}
                data={reportdata}
                pagination
                fixedHeader
                selectableRowsHighlight
                highlightOnHover
                customStyles={customStyles}
                
             />
       </div>
       <ToastContainer/>
      </>
  )


}


export default BillingReport