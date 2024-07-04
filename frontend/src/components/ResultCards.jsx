function ResultCards({ result, format }) {
    if (format == "monster") {
        return (
            <div className="card shadow-sm mb-4 col-12 col-md-6 col-lg-4">
                <div className="card-body">
                    <h5 className="card-title text-primary">{result.name}</h5>
                    <p className="card-text">{result.desc}</p>
                    <ul className="list-group list-group-flush mt-3">
                        <li className="list-group-item">
                            <strong>Size:</strong> {result.size}
                        </li>
                        <li className="list-group-item">
                            <strong>Alignment:</strong> {result.alignment}
                        </li>
                        <li className="list-group-item">
                            <strong>Type:</strong> {result.type}
                        </li>
                        <li className="list-group-item">
                            <strong>Armor Class:</strong> {result.armor_class}
                        </li>
                        <li className="list-group-item">
                            <strong>Challenge Rating:</strong> {result.challenge_rating}
                        </li>
                    </ul>
                </div>
            </div> 
        ) 
    } else if (format == "spell") {
        return (
            <div className="card shadow-sm mb-4 col-12 col-md-6 col-lg-4">
                <div className="card-body">
                    <h5 className="card-title text-primary">{result.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{result.level} Spell</h6>
                    <p className="card-text">{result.desc}</p>
                    <ul className="list-group list-group-flush mt-3">
                        <li className="list-group-item">
                            <strong>Casting Time:</strong> {result.casting_time}
                        </li>
                        <li className="list-group-item">
                            <strong>Duration:</strong> {result.duration}
                        </li>
                        <li className="list-group-item">
                            <strong>Classes:</strong> {result.dnd_class}
                        </li>
                        <li className="list-group-item">
                            <strong>Components:</strong> {result.components}
                        </li>
                    </ul>
                </div>
            </div>
        ); 
    } 
}

export default ResultCards;