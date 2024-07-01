const ErrorMessage = ({message}) => {
    return (
        <> 
            <div className="alert alert-warning alert-dismissible fade show" role="alert">
                {message}  
            </div>
        </>
    );
}

export default ErrorMessage;
