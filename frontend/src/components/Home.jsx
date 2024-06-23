import { useState } from 'react';
import { useNavigate } from "react-router-dom";  

function Home() {
    const [search, setSearch] = useState(""); 
    const navigate = useNavigate();
 
    const handleSubmit = (event) => {
        event.preventDefault();  
        navigate(`/weather/${search}`);
    }
    
    return (
    <div className="d-flex flex-column mx-auto col-12 align-items-center vh-100 justify-content-center" >
        <p className="col-12 text-center fs-1 fw-bold text-light" >Tell me about...</p>  
        <form className="d-flex flex-column col-12 align-items-center " onSubmit={handleSubmit}>
            <input className="col-6 col-md-5 col-lg-4 my-2" type="search" placeholder="Location name..." aria-label="Search" value={search}
            onChange={(e) => setSearch(e.target.value)} />
            <button className="col-4 col-md-2 col-lg-1 btn btn-primary btn-lg" type="submit" >
            Search
            </button>
        </form> 
    </div>
    );
}

export default Home;