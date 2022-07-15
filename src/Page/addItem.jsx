import React,{useState,useEffect} from 'react'
import axios from 'axios'
import BaseUrl from '../config/BaseUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListItems from './listitems';
import { useNavigate } from 'react-router';




const AddItem = () => {
    const navigate =useNavigate()
    const [menuItem,setmenuItem] =useState({MenuItemId:'',MenuName:'',Category:'',foodCategory:'',Rate:'',ManualCode:'',serviceTax:''})
    const [data,setdata] =useState('')


    const addItemHandler =(event)=>{
        const {name,value} =event.target
        setmenuItem((previousdata)=>({...previousdata,[name]:value}))
    }

    const AddnewItem =()=>{
        axios
            .post(`${BaseUrl.url}/api/v1/addfood`,menuItem)
            .then(res=>{
                console.log(res.data)
                   setdata(res.data.food)
                   toast.success(res.data.message,{
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 8000
                   })
                   window.location.reload()
                  
            })
            .catch(err=>{
                  toast.error(err.message)
            })

   }

   const logout =()=>{
    window.localStorage.removeItem('token')
    navigate('/login')
}

  return (
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
      <div className="container w-50 border" id="mobileform">
        <div className="row">
          <h4 className="row justify-content-center">Add Menu items</h4>
          <div>

          <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Menu Item ID
              </label>
              <input
                type="text"
                className="form-control"
                name='MenuItemId'   
                onChange={addItemHandler}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Menu Names
              </label>
              <input
                type="text"
                className="form-control"
                name='MenuName'   
                onChange={addItemHandler}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Category
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                name='Category' 
                onChange={addItemHandler}
              >
                <option selected>Choose Category</option>
                <option value="Veg">Veg</option>
                <option value="Non_Veg">Non Veg</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Food Category
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                name="foodCategory"   
                onChange={addItemHandler}
              >
                <option selected>Choose Food Category</option>
                <option value="Indian-food">Indian-food</option>
                <option value="Chinese-Food">Chinese-Food</option>
                <option value="italian food">Italian food</option>
                <option value="Snacks">Snacks</option>
                <option value="Drink">Drink</option>
                <option value="HardDrink">Hard Drink</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Stock Available
              </label>
              <input
                type="text"
                className="form-control"
                name='StockAvailbel'   
                onChange={addItemHandler}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Rate
              </label>
              <input
                type="text"
                className="form-control"
                name='Rate' 
                onChange={addItemHandler}
              />
            </div>
           <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                GST %
              </label>
              <input
                 type="text"
                 className="form-control"
                 name='serviceTax'
                 onChange={addItemHandler}
              />
            </div> 
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Manual Code
              </label>
              <input
                type="text"
                className="form-control"
                name='ManualCode'  
                onChange={addItemHandler} 
              />
            </div>
            <div className="text-end">
            <button
                type="submit"
              className="btn btn-primary"
              style={{ width: 100, height: 50, fontSize: 18 }}
              onClick={AddnewItem}
            >
              Save
            </button>
          </div>
          
          </div>
        </div>
        <br />
        <br />      </div>
<div>
    <br></br>
    <br></br>
           <ListItems/>
      </div>
      <ToastContainer/>
    </>
  );
};

export default AddItem;
