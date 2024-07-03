function ResultCards({ result, format }) {
    if (format == "monster") {
        return (
            <div className="card bg-info text-white text-decoration-none mb-3 hover-effect">
                <div className="card-body p-4">
                    <h3 className="card-title text-center mb-0">
                    {result.name}
                    </h3>
                </div>
            </div>
        ); 
    } else if (format == "spell") {
        return (
            <div className="card bg-info text-white text-decoration-none mb-3 hover-effect">
                <div className="card-body p-4">
                    <h3 className="card-title text-center mb-0">
                    {result.name}
                    </h3>
                </div>
            </div>
        ); 
    } 
}

export default ResultCards;