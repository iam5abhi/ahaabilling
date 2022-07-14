import logo from './logo.svg';
import './App.css';
import { Routes, Route,BrowserRouter, Link } from "react-router-dom";
import Home from './Page/Home';
import Login from './Page/Login';
import DashBoadrd from './Page/dashbaord';
import ListItems from './Page/listitems';
function App() {
  return (  
    <BrowserRouter>
        <Routes>
           <Route path="/" element={<Home/>}/>
           <Route path='/login' element={<Login/>}/>
           <Route path='/dashboad' element ={<DashBoadrd/>}/>
           <Route path='/listitem' element ={<ListItems/>}/>
        </Routes>
   </BrowserRouter>
  );
}

export default App;
