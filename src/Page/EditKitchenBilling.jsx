import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import BaseUrl from "../config/BaseUrl";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navigation from "../component/Navbar";
import {ToastContainer,toast} from 'react-toastify'

const EditKitchenBilling = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [totalBillAmount, setTotalBillAmout] = useState(0);
  const [GST, setGST] = useState();
  const [discountprice, setdiscountprice] = useState();
  const [netBillAmount, setnnetBillAmount] = useState();
  const [fooodContainer, setfooodContainer] = useState([
    { id: uuidv4(), menuItemId: "", menuName: "", quantity: 1, Amount: "" },
  ]);
  const [roomServiceCharge, setroomServiceCharge] = useState();
  const [userdata, setuserdata] = useState({
    KitchenBillNumber:"",
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
    DiscountPrice: "",
    FinalBillAmount: "",
    RoomServiceCharge: "",
    NumberofPerson: "",
    foods: [],
  });


  const handleAddFields = () => {
    setfooodContainer([
      ...fooodContainer,
      { id: uuidv4(), menuItemId: "", menuName: "", quantity: 1, Amount: "" },
    ]);
    // foodDataHandlre(userdata)
  };

  const handleRemoveFields = (id) => {
    const value = [...fooodContainer];
    const filteredArray = value.filter((data) => {
      return data.id !== id;
    });
    setfooodContainer(filteredArray);

      const data = [...userdata.foods];
      const foodfilterArray = data.filter((data) => {
        return data.id !== id;
      });
      setuserdata((preState) => ({
        ...preState,
        foods: foodfilterArray,
      }));
  };

  const dataHandler = (event) => {
    setuserdata((preState) => ({
      ...preState,
      [event.target.name]: event.target.value,
    }));
  };

  const dataRemoverhandler = (id) => {
    const fooddata = [...userdata.foods];
    const foodfilterArray = fooddata.filter((fooddata) => {
      return fooddata.id != id;
    });
    setuserdata((preState)=>({
      ...preState,
      foods:foodfilterArray
    }))
    getTatal(foodfilterArray)
  };

  const  getTatal =(foodfilterArray)=>{   
    const fooddata =foodfilterArray
    let total = 0;
    let gst = 0;
    let finalbillAmount = 0;
    for(let i=0; i<=fooddata.length;i++){
      total=  total =fooddata[i].quantity*fooddata[i].Amount+total
      gst = Math.floor((total * 5) / 100)
      finalbillAmount = Math.floor(total + gst * 1 + gst * 1+roomServiceCharge-discountprice) 
      setTotalBillAmout(total)
      setGST(gst)
      setnnetBillAmount(finalbillAmount)
      foodDataHandlre(userdata)
        setuserdata((prestate) => ({
            ...prestate,
            TotalAmount: total,
            SGST: gst,
            CGST: gst,
            FinalBillAmount: finalbillAmount,
       })); 


    }
  }


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
        setfooodContainer(tempArray)
        
       foodDataHandlre(userdata,e.target.id)
       getTotalAmout()
      
      });
  };

  const foodquantityHandler = (e) => {
    if (e.target.value) {
      let tempArray = fooodContainer.map((food) => {
        if (food.id == e.target.id) food.quantity = e.target.value * 1;
        return food;
      });

      setfooodContainer(tempArray);
      foodDataHandlre(userdata)
      getTotalAmout()
    }
  };

console.log(userdata)

  const EditBilgenreate = () => {
     axios
      .get(`${BaseUrl.url}/api/v2/bill/report/${id}`)
      .then((res) => {
        const response =res.data.data
        setuserdata({
          KitchenBillNumber:response.response,
          Date: response.Date,
          TableNumber: response.TableNumber,
          WaiterName: response.WaiterName,
          Reason: response.Reason,
          kotdetails: response.kotdetails,
          CustomerMobileNumber: response.CustomerMobileNumber,
          CustomerName: response.CustomerName,
          gstNumber: response.gstNumber,
          TotalAmount: response.TotalAmount,
          SGST: response.SGST,
          CGST: response.CGST,
          DiscountPrice: response.DiscountPrice,
          FinalBillAmount: response.FinalBillAmount,
          RoomServiceCharge: response.RoomServiceCharge,
          NumberofPerson: response.NumberofPerson,
          foods: response.foods,
        });
        setTotalBillAmout(response.TotalAmount)
        setdiscountprice(response.DiscountPrice)
        setroomServiceCharge(response.RoomServiceCharge)
        setGST(response.CGST)
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const EditData = (e) => {
    e.preventDefault();
    axios
      .patch(`${BaseUrl.url}/api/v2/edit/report/${id}`, userdata)
      .then((res) => {
        console.log(res.status)
          toast.success("Update data Sucesfully")
      })
      .catch((err)=>{
          toast.error(err.message)
      })
  };




    
  const foodDataHandlre = (userdata,Id) => {
       fooodContainer.map((data)=>{
          if(data.id==Id){
          userdata.foods.push(data)
          }
     })
  
  };






  const getTotalAmout = () => {
     const fooddata = [...userdata.foods]
    console.log(fooddata)
    let total = 0;
    let gst = 0;
    let finalbillAmount = 0;
    for(let i=0;i<fooddata.length;i++){
      total =fooddata[i].quantity*fooddata[i].Amount+total
      gst = Math.floor((total * 5) / 100);
     finalbillAmount = Math.floor(total + gst * 1 + gst * 1+roomServiceCharge-discountprice);
      setTotalBillAmout(total)
      setGST(gst)
      setnnetBillAmount(finalbillAmount)
      foodDataHandlre(userdata)
        setuserdata((prestate) => ({
            ...prestate,
            TotalAmount: total,
            SGST: gst,
            CGST: gst,
            FinalBillAmount: finalbillAmount,
       })); 
    }
  };

    // discount handler Function
    const discounHandler = (event) => {
      console.log(event.target.value)
      setdiscountprice(event.target.value);
      const finalbillAmount =
        totalBillAmount +
        GST * 1 +
        GST * 1 +
        roomServiceCharge * 1 -
        event.target.value * 1;
      setnnetBillAmount(finalbillAmount);
      setuserdata((preState) => ({
        ...preState,
          DiscountPrice: event.target.value,
        FinalBillAmount: finalbillAmount,
      }));
    };

    // RoomServicehandler function
    const roomServicehandler = (event) => {
      setroomServiceCharge(event.target.value);
      const finalbillAmount =
        totalBillAmount +
        GST * 1 +
        GST * 1 +
        event.target.value * 1 -
        discountprice;
        debugger
      setnnetBillAmount(finalbillAmount);
      setuserdata((prestate) => ({
        ...prestate,
        FinalBillAmount: finalbillAmount,
        RoomServiceCharge: event.target.value,
      }));
    };



  useEffect(() => {
    EditBilgenreate();
  }, [id]);
  return (
    <>
      <Navigation />
      <br />
      <div className="container border w-100" id="mobileform">
        <form onSubmit={EditData}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="first">Date</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Date"
                  id="Date"
                  name="Date"
                  defaultValue={userdata.Date}
                  onChange={(event) => {
                    dataHandler(event);
                  }}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="last">Phone no.</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Phone no."
                  id="Phone"
                  name="CustomerMobileNumber"
                  defaultValue={userdata.CustomerMobileNumber}
                  onChange={(event) => {
                    dataHandler(event);
                  }}
                />
              </div>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="company">Table no.</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Table no."
                  id="Table"
                  name="TableNumber"
                  defaultValue={userdata.TableNumber}
                  onChange={(event) => {
                    dataHandler(event);
                  }}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="phone">Name</label>
                <input
                  type="tel"
                  className="form-control"
                  id="name"
                  placeholder="Enter name"
                  name="CustomerName"
                  defaultValue={userdata.CustomerName}
                  onChange={(event) => {
                    dataHandler(event);
                  }}
                />
              </div>
            </div>
          </div>
          {/*  row   */}
          <br />
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="text">Waiter Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="waiterName"
                  placeholder="Enter Waiter Name"
                  name="WaiterName"
                  defaultValue={userdata.WaiterName}
                  onChange={(event) => {
                    dataHandler(event);
                  }}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="GST">GST no.s</label>
                <input
                  type="text"
                  className="form-control"
                  id="GST"
                  placeholder="Enter GST no."
                  name="gstNumber"
                  defaultValue={userdata.gstNumber}
                  onChange={(event) => {
                    dataHandler(event);
                  }}
                />
              </div>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="text">Reason</label>
                <input
                  type="text"
                  className="form-control"
                  id="reason"
                  placeholder="Enter Reason"
                  name="Reason"
                  defaultValue={userdata.Reason}
                  onChange={(event) => {
                    dataHandler(event);
                  }}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="KOT">KOT</label>
                <input
                  type="text"
                  className="form-control"
                  id="KOT"
                  placeholder="Kot Detail"
                  name="kotdetails"
                  defaultValue={userdata.kotdetails}
                  onChange={(event) => {
                    dataHandler(event);
                  }}
                />
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
              {userdata.foods.map((food, id) => {
                return (
                  <tr key={food.id}>
                    <td>{id + 1}</td>
                    <td>{food.menuItemId}</td>
                    <td>{food.menuName}</td>
                    <td>{food.quantity * 1}</td>
                    <td>{+food.quantity * food.Amount}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-default btn-sm"
                        onClick={() => dataRemoverhandler(food.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <br />

          <table className="table" style={{ backgroundColor: "#F2F3F5" }}>
            <thead>
              <tr>
                <th>Sr.</th>
                <th>Code</th>
                <th>Item Name</th>
                <th>Quatity</th>
                <th>Price</th>
                <th>Action</th>
                <th>Action</th>
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
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Amount"
                  id="Amount"
                  name="TotalAmount"
                  value={totalBillAmount*1}
                  disabled
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="last">Add CGST</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter CGST"
                  id="GST"
                  name="CGST"
                  defaultValue={userdata.CGST}
                  disabled
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="company">Room Service Charge</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Room Service Charge"
                  id="Room"
                  name="RoomServiceCharge"
                  defaultValue={roomServiceCharge}
                  onChange={(event)=>{
                    roomServicehandler(event)
                  }}
                />
              </div>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="company">Discount</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Discount"
                  id="Discount"
                  name="DiscountPrice"
                  defaultValue={discountprice}
                  onChange={(event) => {
                    discounHandler(event);
                  }}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="phone">Add SGST</label>
                <input
                  type="tel"
                  className="form-control"
                  id="SGST"
                  placeholder="Enter SGST"
                  name="SGST"
                  defaultValue={userdata.SGST}
                  disabled
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="phone">No. of Person</label>
                <input
                  type="tel"
                  className="form-control"
                  id="personno"
                  placeholder="No. of Person"
                  name="NumberofPerson"
                  defaultValue={userdata.NumberofPerson}
                  onChange={(event) => {
                    dataHandler(event);
                  }}
                />
              </div>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="company">Net Bill Amount</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Net Bill Amount"
                  id="NetBill"
                  name="FinalBillAmount"
                  defaultValue={userdata.FinalBillAmount}
                  disabled
                />
              </div>
            </div>
            <br />
            <div className="row">
              <div className="button text-center ">
                <button
                  type="submit"
                  className="btn btn-success"
                >
                   Update
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer/>
    </>
  );
};

export default EditKitchenBilling;
