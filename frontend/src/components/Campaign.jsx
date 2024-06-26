 

function Campaign({id}) {
    

    return (
    <div className="d-flex flex-column mx-auto col-12 vh-100 text-bg-dark align-items-center" >
        <div className='title'>
            <h1 className="col-12 text-center fs-1 fw-bold text-light" >Build your next campaign</h1>  
        </div> 
        <div className='c h-50 text-bg-info col-12'>
            <p className="col-12 text-center fs-1 fw-bold text-light " >Campaign Info</p>  
        </div> 
        <div className='c h-50 text-bg-info col-12 d-flex flex-row'>
                <div className="col-6 text-center fs-1 fw-bold text-light  text-bg-light" >Notes</div>  
                <div className="col-6 text-center fs-1 fw-bold text-light text-bg-danger " >Campaign Info</div>  
        </div> 
    </div>
    );
}

export default Campaign;