import { useState } from 'react';
import { useNavigate } from "react-router-dom";  

function Home() { 
    return (
        <div className="d-flex flex-column col-12 vh-100 text-bg-light align-items-center" >
            <div className='col-12 h-50 text-bg-info align-content-center'>
                <p className="col-12 text-center fs-1 fw-bold text-light " >Build your next campaign</p>  
            </div> 
            <div className='col-12 h-25 text-bg-dark my-2 align-content-center'>
                <p className="col-12 text-center fs-1 fw-bold text-light" >Create your own D&D character</p>  
            </div> 
            <div className='col-12 h-25 text-bg-dark my-1 align-content-center'>
                <p className="col-12 text-center fs-1 fw-bold text-light" >Access D&D tools</p>  
            </div> 
            <div className='col-12 h-25 text-bg-dark my-1 align-content-center'>
                <p className="col-12 text-center fs-1 fw-bold text-light" >More Information</p>  
            </div> 
            
    </div>
    );
}

export default Home;