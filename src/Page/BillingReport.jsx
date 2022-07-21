import React,{useState,useEffect} from "react";
import axios from "axios";
import BaseUrl from "../config/BaseUrl";
import DataTable,{ createTheme } from 'react-data-table-component';
import { useNavigate } from "react-router-dom";
import {ToastContainer,toast} from 'react-toastify'
import Navigation from "../component/Navbar";



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
        console.log(res)
        toast.success('delete data Sucessfully')
      })
      .catch(err => {
           toast.error(err.message)
      })
    }


    const printhandler =(id)=>{
       navigate(`/bill/${id}`)
    }


    const columns =[
        {
            name:'Date',
            selector: row => row.Date,
            sortable:true
        },
        {
            name:'Bill no',
            selector: row => row.KitchenBillNumber,
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
          <Navigation/>
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