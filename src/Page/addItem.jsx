import React,{useState,useEffect} from 'react'
import axios from 'axios'
import BaseUrl from '../config/BaseUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListItems from './listitems';
import { useNavigate } from 'react-router';
import Navigation from '../component/Navbar';




const AddItem = () => {
  const navigate =useNavigate()
    const [menuItem,setmenuItem] =useState({MenuItemId:'',MenuName:'',Category:'',foodCategory:'',Rate:'',ManualCode:'',serviceTax:''})
    const [data,setdata] =useState('')


    const addItemHandler =(event)=>{
        const {name,value} =event.target
        setmenuItem((previousdata)=>({...previousdata,[name]:value}))
    }

    const AddnewItem =(e)=>{
      e.preventDefault();
        axios
            .post(`${BaseUrl.url}/api/v1/addfood`,menuItem)
            .then(res=>{
                  setdata(res.data.food)
                  toast.success(res.data.message,{
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 8000
                  })
                
                  navigate('/additem')
            })
            .catch(err=>{
                  toast.error(err.message)
            })

  }



  return (
    <>
      <Navigation/>
      <div className="container w-50 mt-4 border" id="mobileform">
        <div className="row">
          <h4 className="row justify-content-center">Add Menu items</h4>
          <form onSubmit={AddnewItem}>
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
              // onClick={AddnewItem}
            >
              Save
            </button>
          </div>
          
          </form>
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
