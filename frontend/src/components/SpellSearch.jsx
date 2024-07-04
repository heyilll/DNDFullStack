import dndService from "../services/dnd.services";
import { useState } from "react";
import ResultCards from "./ResultCards";

function SpellSearch({ }) {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await dndService.spellsService(search); 
            setResults(res.results);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} method="get" aria-label="Spell search form">
            <div className="mb-4">
              <label htmlFor="spell" className="form-label">
                Search spells
              </label>
              <input
                type="text"
                id="spell"
                name="spell"
                className="form-control form-control-lg"
                placeholder="Enter a spell name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                required
              />
            </div>
            <div className="mb-4 d-flex flex-wrap">
            {results && results.map((result) =>
                <ResultCards key={result.slug} result={result} format={"spell"} />)}   
            </div>
        </form> 
    ); 
}

export default SpellSearch;