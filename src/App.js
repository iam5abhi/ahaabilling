import logo from './logo.svg';
import './App.css';
import { Routes, Route,BrowserRouter, Link } from "react-router-dom";
import Home from './Page/Home';
import Login from './Page/Login';
import DashBoadrd from './Page/dashbaord';
import MenuItemList from './Page/MenuItemList';
import AddItem from './Page/addItem'
import EditItems from './Page/EditItems';
import PrivateRoutes from './routes/PrivateRoutes';
import KitchenBill from './Page/KitchenBillingSystem';
import BillingReport from './Page/BillingReport';
import CusuomerBill from './Page/cusomerbill'
import EditKitchenBilling from './Page/EditKitchenBilling'

function App() {
  return (  
    <BrowserRouter>
        <Routes>
           <Route path="/" element={<Home/>}/>
           <Route path='/login' element={<Login/>}/>
           <Route path='/dashboad' element ={<PrivateRoutes><DashBoadrd/></PrivateRoutes>}/>
           <Route path='/listitem' element ={<PrivateRoutes><MenuItemList/></PrivateRoutes>}/>
           <Route path='/additem' element ={<PrivateRoutes><AddItem/></PrivateRoutes>}/>
           <Route path='/listitem/:fid' element={<PrivateRoutes><EditItems/></PrivateRoutes>} />
           <Route path='/generatebill' element={<PrivateRoutes><KitchenBill/></PrivateRoutes>}/>
           <Route path='/report' element={<PrivateRoutes><BillingReport/></PrivateRoutes>}/>
           <Route path='/report/:id' element={<PrivateRoutes><EditKitchenBilling/></PrivateRoutes>}/>
           <Route path='/bill/:id' element={<PrivateRoutes><CusuomerBill/></PrivateRoutes>}/>
        </Routes>
   </BrowserRouter>
  );
}

export default App;
