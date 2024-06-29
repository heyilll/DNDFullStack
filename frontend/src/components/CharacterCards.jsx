import { Link } from "react-router-dom";

function CharacterCards({ character }) {
    return (
        <Link to={`../characters/${character._id}`} className="m-2 h-25 text-bg-info col-12 col-md-6 col-lg-4"> 
            <p className="col-12 text-center fs-1 fw-bold text-light " >{ character.name }</p>  
        </Link>
    ); 
}

export default CharacterCards;