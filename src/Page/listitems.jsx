import React,{useState,useEffect} from 'react'
import DataTable,{ createTheme } from 'react-data-table-component';
import axios from 'axios';
import BaseUrl from '../config/BaseUrl'
import {ToastContainer,toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'


const customStyles = {
    row: {
        style: {
            backgroundColor:"yellow"
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


const ListItems  =()=>{
     const navigate =useNavigate()
    const [menuItem,setmenuItem] =useState()
    const [loading,setloading] =useState(true)


    const Editfoodiems =(id)=>{
        navigate(`/listitem/${id}`)
    }

    const deletefoodiems =(id)=>{
        const filteredArray = menuItem.filter((data) => {
            return data._id != id;
          });
      
          setmenuItem(filteredArray) 
          axios.delete(`${BaseUrl.url}/api/v1/listoffood/${id}`)
          .then(res => {
            toast.success('delete data Sucessfully')
          })
          .catch(err => {
               toast.error(err.message)
          })
    }

    useEffect(() => {
        axios.get(`${BaseUrl.url}/api/v1/lisOffood`)
       .then((res)=>{
           setmenuItem(res.data.food)
           setloading(false)
       })
       .catch(err=>{
           alert(err.message)
       })
    },[]);


    const columns =[
        {
            name:'MenuItemId',
            selector: row => row.menuItemId,
            sortable:true
        },
        {
            name:'MenuItemName',
            selector: row => row.menuName,
            sortable:true
        },
        {
            name:'Category',
            selector:row=>row.category,
            sortable:true
        },
        {
            name:'Food Category',
            selector:row=>row.foodCategory,
            sortable:true
        },
        {
            name:'Amount',
            selector:row=>row.rate,
        },
        {
            name:'Service Tax',
            selector:row=>row.serviceTax,
        },
        {
            name:'Toatl Amount',
            selector:row=>row.totalAmount,
            sortable:true
        },

        {
            name:'Action',
            cell:(row)=><button className="btn btn-sm btn-primary" onClick={()=>{Editfoodiems(row._id)}}>Edit</button>
        },
        
        {
            name:'Action',
            cell:(row)=><button className="btn btn-sm btn-danger" onClick={()=>{deletefoodiems(row._id)}}>Delete</button>
        },

    ]


      
    if(loading){
        return(
            <div>Loading......</div>
        )
    }

    return(
        <>
           <DataTable
                title="Menu Items"
                columns={columns}
                data={menuItem}
                pagination
                fixedHeader
                selectableRowsHighlight
                highlightOnHover
                customStyles={customStyles}        
             />
             <ToastContainer/>
        </>
    )
}


export default ListItems