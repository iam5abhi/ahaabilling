import React from "react";


const ListItems  =()=>{
    return(
        <>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#"></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul class="navbar-nav ms-md-auto gap-2 ">
                    <li class="nav-item ">
                        <a class="nav-link " aria-current="page" href="#">Sale Report</a>
                    </li>
                    <li class="nav-item ">
                        <a class="nav-link " aria-current="page" href="#">Add Item</a>
                    </li>
                    <li class="nav-item ">
                        <a class="nav-link " aria-current="page" href="#">Bill Generate</a>
                    </li>
                    <li class="nav-item ">
                        <a class="nav-link " aria-current="page" href="#">List of Item</a>
                    </li>
                    <li class="nav-item ">
                        <a class="nav-link " aria-current="page" href="#">Report</a>
                    </li>
                    <li class="nav-item ">
                        <button type="button" class="btn btn-success" aria-current="page">Logout</button>
                    </li>
            
                </ul>
            </div>
        </div>
    </nav>
    <div class="vh-100 d-flex justify-content-center align-items-center">
        
    </div>
  
        </>
    )
}


export default ListItems