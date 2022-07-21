import React,{useState,useEffect,useRef} from "react";
import { useParams } from "react-router-dom";
import BaseUrl from "../config/BaseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import Navigation from "../component/Navbar";


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
      <Navigation/>
  <br/>  <br/>  <br/>
  <div className=" d-flex justify-content-center align-items-center mb-4">
  <button className="btn btn-success" onClick={handleToPrint}>Print</button>

  </div>
      <div className="container" ref={componentRef}>
        <div className="card">
          <div className="card-body">
          <h5 className="text-center">Restaurant Bill</h5>
            <div className="row mb-4">
              <div className="col-sm-6 pt-3 w-60">
                <h6 className="mb-3">Bill No:{billingdata.KitchenBillNumber}</h6>
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
            <hr className="dashed" style={{borderTop: '2px dashed #000'}} />

            <div className="table-responsive-sm">
              <table className="table table-striped" >
                <thead>
                  <tr>
                    <th>Item</th>
                    <th className="center">Qty</th>
                    <th className="right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {
                     billingdata.foods.map((data,id)=>{
                        return(
                            <tr key={data._id}>
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
                        <strong>SubTotal</strong>
                      </td>
                      <td className="right">{billingdata.TotalAmount}</td>
                    </tr>

                    <tr>
                      <td className="left">
                        <strong>Discount</strong>
                      </td>
                      <td className="right">{billingdata.DiscountPrice}</td>
                    </tr>

                    <tr>
                        <td className="left">
                          <strong>Tax</strong>
                        </td>
                        <td className="right">{billingdata.SGST+billingdata.CGST}</td>
                    </tr>
                    <tr>
                      <td className="left">
                        <strong>Room Charges</strong>
                      </td>
                      <td className="right">{billingdata.RoomServiceCharge}</td>
                    </tr>
                    <tr>
                      <td className="left">
                        <strong>Total</strong>
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
