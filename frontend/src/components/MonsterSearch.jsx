import ResultCards from "./ResultCards";
import dndService from "../services/dnd.services";
import { useState } from "react"; 

function MonsterSearch({ }) {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await dndService.monstersService(search); 
            setResults(res.results);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} method="get" aria-label="Monster search form" >
            <div className="mb-4">
              <label htmlFor="monster" className="form-label">
                Search monsters
              </label>
              <input
                type="text"
                id="monster"
                name="monster"
                className="form-control form-control-lg"
                placeholder="Enter a monster name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                required
              />
            </div> 
            <div className="mb-4">
            {results && results.map((result) =>
                <ResultCards key={result.slug} result={result} format={"monster"} />)}   
            </div>
        </form> 
    ); 
}

export default MonsterSearch;