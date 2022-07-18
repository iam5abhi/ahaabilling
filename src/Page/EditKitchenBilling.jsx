import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import BaseUrl from "../config/BaseUrl";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navigation from "../component/Navbar";

const EditKitchenBilling= () => {
    const navigate=useNavigate()
    const {id} =useParams()
  const [fooodContainer, setfooodContainer] = useState([ { id: uuidv4(), menuItemId: "", menuName: "", quantity: 1, Amount: "" }]);

   const [userdata,setuserdata] =useState()
   const [laoding,setloading] =useState(true)
  

    const [userBill,setUserBill] =useState()
  const dataHandler = (event) => {
    setUserBill(() => ({
      [event.target.name]: event.target.value,
    }));
  };


  const handleAddFields = () => {
    setfooodContainer([
      ...fooodContainer,
      { id: uuidv4(), menuItemId: "", menuName: "", quantity: 1, Amount: "" },
    ]);
  };
 

  const foodquantityHandler = (e) => {
    if (e.target.value) {
      let tempArray = fooodContainer.map((food) => {
        if (food.id == e.target.id) food.quantity = e.target.value * 1;
        return food;
      });
      setfooodContainer(tempArray);
      foodDataHandlre(userBill, e.target.id);
    }
  };
  const foodApi = (e) => {
    axios
      .get(`${BaseUrl.url}/api/v1/searchItem?MenuItemId=${e.target.value}`)
      .then((res) => {
        let response = res.data.food;
        let tempArray = fooodContainer.map((food) => {
          if (food.id == e.target.id) {
            food.menuItemId = response.menuItemId;
            food.menuName = response.menuName;
            food.Amount = response.totalAmount;
          }
          return food;
        });
        setfooodContainer(tempArray);
        foodDataHandlre(userBill, e.target.id);
      });
   };

  const foodDataHandlre = (userBill, Id) => {
    fooodContainer.map((food) => {
      if (food.id === Id) {
        userBill.foods.push(food);
      } else {
      }
    });
  };





   const EditBilgenreate =()=>{
       axios.get(`${BaseUrl.url}/api/v2/bill/report/${id}`)
       .then((res)=>{
           setuserdata(res.data.data)
           setloading(false)
       })
      .catch((err)=>{
          alert(err.message)
      })
   }




  const EditData =()=>{
       axios.patch(`${BaseUrl.url}/api/v2/edit/report/${id}`,userBill)
       .then(res=>{
          alert('upadetd billing data')
       })   
  }

  useEffect(() => {
       EditBilgenreate()
  }, [fooodContainer]);

  if(laoding){
    return(
        <div>loading.....</div>
    )
  }
  return (
    <>
         <Navigation/>
      <br/>
    <div className="container border w-100" id="mobileform">
  <form>
    <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="first">Date</label>
          <input type="text" className="form-control" placeholder="Enter Date" id="Date" name="Date" defaultValue={userdata.Date} onChange={(event)=>{ dataHandler(event)}} />
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="last">Phone no.</label>
          <input type="text" className="form-control" placeholder="Enter Phone no." id="Phone" name="CustomerMobileNumber" defaultValue={userdata.CustomerMobileNumber} onChange={(event)=>{ dataHandler(event)}}  />
        </div>
      </div>
    </div>
    <br />
    <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="company">Table no.</label>
          <input type="text" className="form-control" placeholder="Enter Table no." id="Table" name="TableNumber" defaultValue={userdata.TableNumber} onChange={(event)=>{ dataHandler(event)}}  />
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="phone">Name</label>
          <input type="tel" className="form-control" id="name" placeholder="Enter name" name="CustomerName" defaultValue={userdata.CustomerName}  onChange={(event)=>{ dataHandler(event)}} />
        </div>
      </div>
    </div>
    {/*  row   */}
    <br />
    <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="text">Waiter Name</label>
          <input type="text" className="form-control" id="waiterName" placeholder="Enter Waiter Name" name="WaiterName" defaultValue={userdata.WaiterName} onChange={(event)=>{ dataHandler(event)}}  />
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="GST">GST no.s</label>
          <input type="text" className="form-control" id="GST" placeholder="Enter GST no." name="gstNumber" defaultValue={userdata.gstNumber} onChange={(event)=>{ dataHandler(event)}}  />
        </div>
      </div>
    </div>
    <br />
    <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="text">Reason</label>
          <input type="text" className="form-control" id="reason" placeholder="Enter Reason" name="Reason" defaultValue={userdata.Reason} onChange={(event)=>{ dataHandler(event)}}  />
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="KOT">KOT</label>
          <input type="text" className="form-control" id="KOT" placeholder="Kot Detail" name="kotdetails" defaultValue={userdata.kotdetails} onChange={(event)=>{ dataHandler(event)}}  />
        </div>
      </div>
    </div>
    <br />
    <br />
    <table className="table">
            <thead>
              <tr>
                <th>Sr no.</th>
                <th>Code</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>#</th>
              </tr>
            </thead>
            <tbody>
              {userdata.foods.map((inputField, id) => {
                return (
                  <tr key={inputField._id}>
                    <td>{id + 1}</td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm "
                        name="MenuItemId"
                        id={inputField.id}
                      defaultValue={inputField.menuItemId}
                        onChange={(e) => foodApi(e)}
                        placeholder="Item Code"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm "
                        name="MenuName"
                      defaultValue={inputField.menuName}
                        readOnly
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm "
                        name="quantity"
                        id={inputField.id}
                        defaultValue={inputField.quantity * 1}
                        onChange={(event) => foodquantityHandler(event)}
                        placeholder="Quantity"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm "
                        name="Amount"
                        defaultValue={+inputField.quantity * inputField.Amount}
                        readOnly
                      />
                    </td>
                    <td>
                      {userdata.foods.length-1===id &&(
                      <button
                        type="button"
                        className="btn btn-default btn-sm"
                        onClick={handleAddFields}
                      >
                        {" "}
                        Add
                      </button>
                      )}
                    </td>  
                  </tr>
                )
              })}
            </tbody>
          </table>
    <br />
    <div className="row">
      <div className="col-md-4">
        <div className="form-group">
          <label htmlFor="first">Amount</label>
          <input type="text" className="form-control" placeholder="Enter Amount" id="Amount" name="TotalAmount"  value={userdata.TotalAmount} disabled />
        </div>
      </div>
      <div className="col-md-4">
        <div className="form-group">
          <label htmlFor="last">Add CGST</label>
          <input type="text" className="form-control" placeholder="Enter CGST" id="GST" name="CGST"  defaultValue={userdata.CGST} disabled />
        </div>
      </div>
      <div className="col-md-4">
        <div className="form-group">
          <label htmlFor="company">Room Service Charge</label>
          <input type="text" className="form-control" placeholder="Room Service Charge" id="Room" name="RoomServiceCharge"  defaultValue={userdata.RoomServiceCharge} />
        </div>
      </div>
    </div>
    <br />
    <div className="row">
      <div className="col-md-4">
        <div className="form-group">
          <label htmlFor="company">Discount</label>
          <input type="text" className="form-control" placeholder="Discount" id="Discount" name="DiscountPrice"  defaultValue={userdata.DiscountPrice}  onChange={(event)=>{dataHandler(event)}} />
        </div>
      </div>
      <div className="col-md-4">
        <div className="form-group">
          <label htmlFor="phone">Add SGST</label>
          <input type="tel" className="form-control" id="SGST" placeholder="Enter SGST" name="SGST"   defaultValue={userdata.SGST} disabled />
        </div>
      </div>
      <div className="col-md-4">
        <div className="form-group">
          <label htmlFor="phone">No. of Person</label>
          <input type="tel" className="form-control" id="personno" placeholder="No. of Person" name="NumberofPerson" defaultValue={userdata.NumberofPerson} onChange={(event)=>{ dataHandler(event)}} />
        </div>
      </div>
    </div>
    <br />
    <div className="row">
      <div className="col-md-4">
        <div className="form-group">
          <label htmlFor="company">Net Bill Amount</label>
          <input type="text" className="form-control" placeholder="Net Bill Amount" id="NetBill" name="FinalBillAmount"   defaultValue={userdata.FinalBillAmount} disabled />
        </div>
      </div>
      <br />
      <div className="row">
        <div className="button text-center ">
          <button type="submit" className="btn btn-success"  onClick={EditData}>Print</button>
        </div>
      </div>
    </div>
  </form>
</div>

    </>
  );
};

export default EditKitchenBilling;
