import React, { useState, useEffect, useRef } from "react";
//  import "./custom.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import BaseUrl from "../config/BaseUrl";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navigation from "../component/Navbar";

const KitchenBillingSystem = () => {
  const navigate = useNavigate();
  const [fooodContainer, setfooodContainer] = useState([
    { id: uuidv4(), menuItemId: "", menuName: "", quantity: 1, Amount: "" },
  ]);

  const [totalBillAmount, setTotalBillAmout] = useState(0);
  const [GST, setGST] = useState(0);
  const [discountprice, setdiscountprice] = useState(0);
  const [roomServiceCharge, setroomServiceCharge] = useState(0);
  const [userBill, setUserBill] = useState({
    Date: "",
    TableNumber: "",
    WaiterName: "",

    Reason: "",
    kotdetails: "",
    CustomerMobileNumber: "",
    CustomerName: "",
    gstNumber: "",
    TotalAmount: 0,
    SGST: "",
    CGST: "",
    DiscountPrice: 0,
    FinalBillAmount: "",
    RoomServiceCharge: "",
    NumberofPerson: "",
    foods: [],
  });


  const [netBillAmount, setnnetBillAmount] = useState();
  const handleAddFields = () => {
    setfooodContainer([
      ...fooodContainer,
      { id: uuidv4(), menuItemId: "", menuName: "", quantity: 1, Amount: "" },
    ]);
    foodDataHandlre(userBill);
  };

  const dataHandler = (event) => {
    setUserBill((preState) => ({
      ...preState,
      [event.target.name]: event.target.value,
    }));
  };

  const discounHandler = (event) => {
    setdiscountprice(event.target.value);
    const finalbillAmount =
      totalBillAmount +
      GST * 1 +
      GST * 1 +
      roomServiceCharge * 1 -
      event.target.value * 1;
    setnnetBillAmount(finalbillAmount);
    setUserBill((preState) => ({
      ...preState,
      DiscountPrice: event.target.value,
      FinalBillAmount: finalbillAmount,
    }));
  };

  const handleRemoveFields = (id) => {
    const value = [...fooodContainer];
    const filteredArray = value.filter((data) => {
      return data.id !== id;
    });
    setfooodContainer(filteredArray);

    const data = [...userBill.foods];
    const foodfilterArray = data.filter((data) => {
      return data.id !== id;
    });
    setUserBill((preState) => ({
      ...preState,
      foods: foodfilterArray,
    }));
  };


  const foodquantityHandler = (e) => {
    if (e.target.value) {
      let tempArray = fooodContainer.map((food) => {
        if (food.id == e.target.id) food.quantity = e.target.value * 1;
        return food;
      });

      setfooodContainer(tempArray);
      foodDataHandlre(userBill);
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
      }
    });
  };

  const getTotalAmout = (userBill) => {
    let total = 0;
    let gst = 0;
    let finalbillAmount = 0;
    for (let i = 0; i < fooodContainer.length; i++) {
      total = +fooodContainer[i].quantity * fooodContainer[i].Amount + total;
      gst = Math.floor((total * 5) / 100);
      finalbillAmount = Math.floor(total + gst * 1 + gst * 1);
      setTotalBillAmout(total);
      setGST(gst);
      setnnetBillAmount(finalbillAmount);
    }
    foodDataHandlre(userBill);
    setUserBill((prestate) => ({
      ...prestate,
      TotalAmount: total,
      SGST: gst,
      CGST: gst,
      FinalBillAmount: finalbillAmount,
    }));
  };

  const roomServicehandler = (event) => {
    setroomServiceCharge(event.target.value);
    const finalbillAmount =
      totalBillAmount +
      GST * 1 +
      GST * 1 +
      event.target.value * 1 -
      discountprice;
    setnnetBillAmount(finalbillAmount);
    setUserBill((prestate) => ({
      ...prestate,
      FinalBillAmount: finalbillAmount,
      RoomServiceCharge: event.target.value,
    }));
  };

  const dataSubmitHandler = (e) => {
    e.preventDefault();
    axios.post(`${BaseUrl.url}/api/v2/bill/genrate`, userBill)
    .then((res) => {
      console.log(res.data)
      toast.success("Bill Generate Sucessfully", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 500,
        theme: "colored",
      });
      navigate(`/bill/${res.data.data._id}`);
    })
    .catch((err)=>{
      toast.error(err.message)
    })
    
  };

  useEffect(() => {
    getTotalAmout(userBill);
  }, [fooodContainer]);
  return (
    <>
<Navigation/>
      <br/>
<div className="container border w-100" id="mobileform">
  <form onSubmit={dataSubmitHandler}>
    <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="first">Date</label>
          <input type="date" className="form-control" placeholder="Enter Date" id="Date" name="Date" onChange={(event)=>{ dataHandler(event)}} />
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="last">Phone no.</label>
          <input type="text" className="form-control" placeholder="Enter Phone no." id="Phone" name="CustomerMobileNumber" onChange={(event)=>{ dataHandler(event)}}  />
        </div>
      </div>
    </div>
    <br />
    <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="company">Table no.</label>
          <input type="text" className="form-control" placeholder="Enter Table no." id="Table" name="TableNumber" onChange={(event)=>{ dataHandler(event)}}  />
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="text">Name</label>
          <input type="text" className="form-control" id="name" placeholder="Enter name" name="CustomerName"  onChange={(event)=>{ dataHandler(event)}} />
        </div>
      </div>
    </div>
    {/*  row   */}
    <br />
    <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="text">Waiter Name</label>
          <input type="text" className="form-control" id="waiterName" placeholder="Enter Waiter Name" name="WaiterName" onChange={(event)=>{ dataHandler(event)}}  />
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="GST">GST no.s</label>
          <input type="text" className="form-control" id="GST" placeholder="Enter GST no." name="gstNumber" onChange={(event)=>{ dataHandler(event)}}  />
        </div>
      </div>
    </div>
    <br />
    <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="text">Reason</label>
          <input type="text" className="form-control" id="reason" placeholder="Enter Reason" name="Reason" onChange={(event)=>{ dataHandler(event)}}  />
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="KOT">KOT</label>
          <input type="text" className="form-control" id="KOT" placeholder="Kot Detail" name="kotdetails" onChange={(event)=>{ dataHandler(event)}}  />
        </div>
      </div>
    </div>
    <br />
    <br />
    <table className="table" style={{"backgroundColor":"#F2F3F5"}}>
                  <thead>
                    <tr>
                      <th>Sr.</th>
                      <th>Code</th>
                      <th>Item Name</th>
                      <th>Quatity</th>
                      <th>Price</th>
                      <th >Action</th>
                      <th >Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fooodContainer.map((inputField, id) => {
                      return (
                        <tr key={inputField.id}>
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
                              value={inputField.menuName}
                              readOnly
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control form-control-sm "
                              name="quantity"
                              id={inputField.id}
                              defaultValue={inputField.quantity}
                              onChange={(event) => foodquantityHandler(event)}
                              placeholder="Quantity"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control form-control-sm "
                              name="Amount"
                              value={+inputField.quantity * inputField.Amount}
                              readOnly
                            />
                          </td>

                          <td>
                            {fooodContainer.length > 1 && (
                              <button
                                type="button"
                                className="btn btn-default btn-sm"
                                onClick={() => {
                                  handleRemoveFields(inputField.id);
                                }}
                              >
                                Remove
                              </button>
                            )}
                          </td>

                          <td>
                            {fooodContainer.length - 1 === id && (
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
                      );
                    })}
                  </tbody>
                </table>
    <br />
    <div className="row">
      <div className="col-md-4">
        <div className="form-group">
          <label htmlFor="first">Amount</label>
          <input type="text" className="form-control" placeholder="Enter Amount" id="Amount" name="TotalAmount"  value={totalBillAmount} disabled />
        </div>
      </div>
      <div className="col-md-4">
        <div className="form-group">
          <label htmlFor="last">Add CGST</label>
          <input type="text" className="form-control" placeholder="Enter CGST" id="GST" name="CGST" value={GST} disabled />
        </div>
      </div>
      <div className="col-md-4">
        <div className="form-group">
          <label htmlFor="company">Room Service Charge</label>
          <input type="text" className="form-control" placeholder="Room Service Charge" id="Room" name="RoomServiceCharge" onChange={(event) =>{roomServicehandler(event)}} />
        </div>
      </div>
    </div>
    <br />
    <div className="row">
      <div className="col-md-4">
        <div className="form-group">
          <label htmlFor="company">Discount</label>
          <input type="text" className="form-control" placeholder="Discount" id="Discount" name="DiscountPrice"  defaultValue={userBill.DiscountPrice} onChange={(event) => {discounHandler(event)}}  />
        </div>
      </div>
      <div className="col-md-4">
        <div className="form-group">
          <label htmlFor="phone">Add SGST</label>
          <input type="tel" className="form-control" id="SGST" placeholder="Enter SGST" name="SGST"  value={GST} disabled />
        </div>
      </div>
      <div className="col-md-4">
        <div className="form-group">
          <label htmlFor="phone">No. of Person</label>
          <input type="tel" className="form-control" id="personno" placeholder="No. of Person" name="NumberofPerson" onChange={(event)=>{ dataHandler(event)}} />
        </div>
      </div>
    </div>
    <br />
    <div className="row">
      <div className="col-md-4">
        <div className="form-group">
          <label htmlFor="company">Net Bill Amount</label>
          <input type="text" className="form-control" placeholder="Net Bill Amount" id="NetBill" name="FinalBillAmount"   value={netBillAmount} disabled />
        </div>
      </div>
      <br />
      <div className="row">
        <div className="button text-center ">
          <button type="submit" className="btn btn-success"  >Print</button>
        </div>
      </div>
    </div>
  </form>
</div>


    </>
  );
};

export default KitchenBillingSystem;
