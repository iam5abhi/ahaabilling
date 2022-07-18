import React,{useState,useEffect,useRef} from "react";
import { useParams } from "react-router-dom";
import BaseUrl from "../config/BaseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";


const CusuomerBill = () => {
    const {id} =useParams()
    const navigate =useNavigate()
    const componentRef = useRef();
    const [laoding,setloading] =useState(true)
    const[billingdata,setbillingdata] =useState()

  const billgenreate =()=>{
    axios.get(`${BaseUrl.url}/api/v2/bill/report/${id}`)
    .then((res)=>{
        setbillingdata(res.data.data)
        setloading(false)
    })
    .catch(err=>{
        alert(err.message)
    })

  }  

  const handleToPrint =useReactToPrint({
    content: () => componentRef.current,
  });


  const logout =()=>{
    window.localStorage.removeItem('token')
    navigate('/login')
}



 useEffect(()=>{
    billgenreate()
 },[id])   

 if(laoding){
    return(
        <div>loading.....</div>
 
    )
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
  <br/>  <br/>  <br/>
  <div className=" d-flex justify-content-end align-items-end">
  <button className="btn btn-success" onClick={handleToPrint}>Print</button>

  </div>
      <div className="container" ref={componentRef}>
        <div className="card">
          <div className="card-body">
          <h5 className="text-center">Restaurant Bill</h5>
            <div className="row mb-4">
              <div className="col-sm-6 pt-3 w-60">
                <h6 className="mb-3">Bill No:{billingdata._id}</h6>
                <div>
                  <h6 className="mb-3 w-20" >Date:{billingdata.Date}</h6>
                </div>
              </div>
              <div className="col-sm-6 pt-3">
                <h6 className="mb-3">Table No:{billingdata.TableNumber}</h6>
                <div>
                  <strong>{billingdata.CustomerName}</strong>
                </div>
                <div>Phone:{billingdata.CustomerMobileNumber}</div>    
              </div>
            </div>
            <div className="table-responsive-sm">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th className="center">#</th>
                    <th>Item</th>
                    <th className="center">Qty</th>
                    <th className="right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {
                     billingdata.foods.map((data,id)=>{
                        return(
                            <tr>
                            <td className="center">{id+1}</td>
                            <td className="left strong">{data.menuName}</td>
                            <td className="center">{data.quantity}</td>
                            <td className="right">{data.Amount}</td>
                          </tr>
                        )
                     })
                  }
                </tbody>
              </table>
            </div>
            <div className="row">
              <div className="col-lg-4 col-sm-5"></div>
              <div className="col-lg-4 col-sm-5 ml-auto">
                <table className="table table-clear">
                  <tbody>
                    <tr>
                      <td className="left">
                        <strong>Total</strong>
                      </td>
                      <td className="right">{billingdata.TotalAmount}</td>
                    </tr>

                    <tr>
                      <td className="left">
                        <strong>SGST</strong>
                      </td>
                      <td className="right">{billingdata.SGST}</td>
                    </tr>
                    <tr>
                      <td className="left">
                        <strong>CGST</strong>
                      </td>
                      <td className="right">{billingdata.CGST}</td>
                    </tr>

                    <tr>
                      <td className="left">
                        <strong>Room Service.Charge</strong>
                      </td>
                      <td className="right">{billingdata.RoomServiceCharge}</td>
                    </tr>
                    <tr>
                      <td className="left">
                        <strong>Net Discount</strong>
                      </td>
                      <td className="right">{billingdata.DiscountPrice}</td>
                    </tr>
                    <tr>
                      <td className="left">
                        <strong>Payable Discount</strong>
                      </td>
                      <td className="right">
                        <strong>{billingdata.FinalBillAmount}</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CusuomerBill;
