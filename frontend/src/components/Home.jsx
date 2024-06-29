import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";  

function Home() { 
    return (
        <div className="d-flex flex-column col-12 text-bg-light align-items-center" >
            <div className='col-12 h-50 text-bg-info align-content-center'>
                <Link className="col-12 text-center fs-1 fw-bold text-light " to={"/addCampaign"}>Build your next campaign</Link>  
            </div> 
            <div className='col-12 h-25 text-bg-dark my-2 align-content-center'>
                <Link className="col-12 text-center fs-1 fw-bold text-light" to={"/addCharacter"}>Create your own D&D character</Link>  
            </div> 
            <div className='col-12 h-25 text-bg-dark my-1 align-content-center'>
                <Link className="col-12 text-center fs-1 fw-bold text-light" to={"/login"}>Login</Link>  
            </div> 
            <div className='col-12 h-25 text-bg-dark my-1 align-content-center'>
                <Link to={"/myview"} className="col-12 text-center fs-1 fw-bold text-light" >My View</Link>  
            </div> 
            
    </div>
    );
}

export default Home;