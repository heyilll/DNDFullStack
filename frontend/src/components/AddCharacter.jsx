import { useState, useEffect } from "react";
import accService from "../services/account.service";
import characterService from "../services/characters.service";
import { useNavigate } from "react-router-dom";

const AddCharacter = () => {
  const [characterName, setCharacterName] = useState("");
  const [characterRace, setCharacterRace] = useState("");
  const [characterClass, setCharacterClass] = useState("");
  const [characterLevel, setCharacterLevel] = useState(""); 
  const [user, setUser] = useState([]);

  useEffect(() => {
        const fetchUser = async () => {
            const data = await accService.getCurrentUser(); 
            setUser(data); 
        };  

        fetchUser(); 
  }, []); 
  
  const navigate = useNavigate();  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await characterService.addCharacterService({
        name: characterName,
        race: characterRace,
        dndclass: characterClass, 
        level: characterLevel,
        created_by: user.id
      });
      console.log(res);
      if (res.status === 201) {
        navigate("/myview");
        console.log(`Added successfully`);
      } else {
        console.log("Addition failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!user && <p>Not logged in</p>}
      {user && <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-lg border-0">
              <div className="card-body p-5">
                <h1 className="mb-4 text-center" style={{ color: "#001450" }}>Create Your Character</h1>
                <form onSubmit={handleSubmit} method="post">
                  <div className="mb-4">
                    <label htmlFor="name" className="form-label">Character Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control form-control-lg"
                      placeholder="Enter character name"
                      value={characterName}
                      onChange={(e) => setCharacterName(e.target.value)}
                      required
                    />
                  </div>
            
                  <div className="mb-4">
                    <label htmlFor="race" className="form-label">Race</label>
                    <select
                      className="form-select form-select-lg"
                      id="race"
                      name="race"
                      value={characterRace}
                      onChange={(e) => setCharacterRace(e.target.value)}
                      required
                    >
                      <option value="" disabled>Select a race...</option>
                      {["Human", "Elf", "Dwarf", "Halfling", "Dragonborn", "Gnome", "Half-Elf", "Half-Orc", "Tiefling"].map(race => (
                        <option key={race.toLowerCase()} value={race.toLowerCase()}>{race}</option>
                      ))}
                    </select>
                  </div>
            
                  <div className="mb-4">
                    <label htmlFor="dndClass" className="form-label">Character Class</label>
                    <select
                      className="form-select form-select-lg"
                      id="dndClass"
                      name="dndClass"
                      value={characterClass}
                      onChange={(e) => setCharacterClass(e.target.value)}
                      required
                    >
                      <option value="" disabled>Select a class...</option>
                      {["Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard"].map(cls => (
                        <option key={cls.toLowerCase()} value={cls.toLowerCase()}>{cls}</option>
                      ))}
                    </select>
                  </div>
            
                  <div className="mb-4">
                    <label htmlFor="level" className="form-label">Character Level</label>
                    <select
                      className="form-select form-select-lg"
                      id="level"
                      name="level"
                      value={characterLevel}
                      onChange={(e) => setCharacterLevel(e.target.value)}
                      required
                    >
                      <option value="" disabled>Select a level...</option>
                      {[...Array(20)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                      ))}
                    </select>
                  </div>
            
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-lg">
                      Create Character
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>}
    </>
  );
};
export default AddCharacter;