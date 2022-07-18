import React from "react";
import ListItems from "./listitems";
import { useNavigate } from "react-router";
import Navigation from "../component/Navbar";

const MenuItemList = () => {
  return (
    <>
       <Navigation/> 
       <ListItems/>
    </>
  );
};

export default MenuItemList;
