import React,{useState,useEffect} from "react";
import { useParams } from "react-router";
import axios from "axios";
import {ToastContainer,toast} from 'react-toastify'
import { useNavigate } from "react-router";
import BaseUrl from "../config/BaseUrl"
import Navigation from "../component/Navbar";

const EditItems = () => {
  const { fid } = useParams();
  const navigate =useNavigate()

  const [menuItem,setmenuItem] =useState({MenuItemId:'',MenuName:'',Category:'',foodCategory:'',Rate:'',ManualCode:'',serviceTax:''})
  const [food,setfood]=useState()
  const [loading,setloading]=useState(true)

  const gettingFunction =()=>{
     axios.get(`${BaseUrl.url}/api/v1/lisOffood/${fid}`)
     .then((res)=>{
          setfood(res.data.food)
          setmenuItem({MenuItemId:res.data.food.menuItemId,MenuName:res.data.food.menuName,Category:res.data.food.category,foodCategory:res.data.food.foodCategory,Rate:res.data.food.rate,ManualCode:res.data.ManualCode,serviceTax:res.data.food.serviceTax})
          setloading(false)
     })
     .catch((err)=>{
      alert(err.message)
     })
  }



  useEffect(() => {
    gettingFunction()
  }, [fid]);

  const addItemHandler =(event)=>{
    const {name,value} =event.target
    setmenuItem((previousdata)=>({...previousdata,[name]:value}))
}

const updatehandler =()=>{
    axios.patch(`${BaseUrl.url}/api/v1/edit/listoffood/${fid}`,menuItem)
    .then((res)=>{
      toast.success(res.data.message,{
        position: toast.POSITION.TOP_CENTER,
        autoClose: 8000
       })
       navigate('/additem')
    })
}




    if(loading){
      return(
        <div>Loading...</div>
      )
    }

  return (
    <>
      <Navigation/>
      <div className="container w-50 border" id="mobileform">
        <div className="row">
          <h4 className="row justify-content-center">Upadte Menu items</h4>
          <div>
          <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Menu Item Id
              </label>
              <input
                type="text"
                className="form-control"
                defaultValue={food.menuItemId}
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
                defaultValue={food.menuName}
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
                <option selected>{food.category}</option>
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
                <option selected>{food.foodCategory}</option>
                <option value="Indian-food">Indian-food</option>
                <option value="Chinese-Food">Chinese-Food</option>
                <option value="italian food">Italian food</option>
                <option value="Snacks">Snacks</option>
                <option value="Drink">Drink</option>
                <option value="HardDrink">Hard Drink</option>
              </select>
            </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Rate
              </label>
              <input
                type="text"
                className="form-control"
                 defaultValue={food.rate}
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
                 defaultValue={`${food.serviceTax}%`}
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
                 default={food.ManualCode}
                 name='ManualCode'  
                 onChange={addItemHandler} 
              />

              <div className="text-end">
            <button
              className="btn btn-primary"
              type="submit"
              style={{ width: 100, height: 50, fontSize: 18 }}
              onClick={updatehandler}
            >
              Update
            </button>
          </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <ToastContainer/>
    </>
  );
};

export default EditItems;
