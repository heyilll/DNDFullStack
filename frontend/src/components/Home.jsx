import { Link } from "react-router-dom";  

function Home() { 
    return (
        <div className="container-fluid py-5 bg-white">
            <div className="row g-4 justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card bg-primary text-white mb-4 hover-effect">
                        <div className="card-body py-5">
                            <Link to="/addCampaign" className="text-white text-decoration-none">
                                <h2 className="card-title text-center mb-0">Build Your Next Campaign</h2>
                            </Link>
                        </div>
                    </div>
                
                    <div className="card bg-dark text-white mb-4 hover-effect">
                        <div className="card-body py-4">
                        <Link to="/addCharacter" className="text-white text-decoration-none">
                            <h3 className="card-title text-center mb-0">Create Your Own D&D Character</h3>
                        </Link>
                        </div>
                    </div>
                
                    <div className="row g-4">
                        <div className="col-6">
                            <div className="card bg-success text-white hover-effect">
                                <div className="card-body py-3">
                                <Link to="/login" className="text-white text-decoration-none">
                                    <h4 className="card-title text-center mb-0">Login</h4>
                                </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="card bg-info text-white hover-effect">
                                <div className="card-body py-3">
                                    <Link to="/myview" className="text-white text-decoration-none">
                                        <h4 className="card-title text-center mb-0">My View</h4>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;