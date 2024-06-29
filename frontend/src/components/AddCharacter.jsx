import { useState, useEffect } from "react";
import accService from "../services/account.service";
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
      const res = await accService.addCharacterService({
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
      <div className="container flex-column bg-white p-5 my-4 form-border">
        <h1 style={{ color: "#001450" }}>Add a Character</h1>
        <form onSubmit={handleSubmit} method="post">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              placeholder="Your Character Name"
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Race" className="form-label px-0">
              Race
            </label>
            <select className="form-select" id="race" name="race" value={characterRace}
              onChange={(e) => setCharacterRace(e.target.value)} required>
              <option value="" disabled>Choose a race...</option>
              <option value="human">Human</option>
              <option value="elf">Elf</option>
              <option value="dwarf">Dwarf</option>
              <option value="halfling">Halfling</option>
              <option value="dragonborn">Dragonborn</option>
              <option value="gnome">Gnome</option>
              <option value="half-elf">Half-Elf</option>
              <option value="half-orc">Half-Orc</option>
              <option value="tiefling">Tiefling</option>
            </select> 
          </div>
          <div className="mb-3">
            <label htmlFor="class" className="form-label px-0">
              Character class
            </label>
            <select 
              className="form-select" 
              id="dndClass" 
              name="dndClass"
              value={characterClass} 
              onChange={(e) => setCharacterClass(e.target.value)}
              required
            >
              <option value="" disabled>Choose a class...</option>
              <option value="barbarian">Barbarian</option>
              <option value="bard">Bard</option>
              <option value="cleric">Cleric</option>
              <option value="druid">Druid</option>
              <option value="fighter">Fighter</option>
              <option value="monk">Monk</option>
              <option value="paladin">Paladin</option>
              <option value="ranger">Ranger</option>
              <option value="rogue">Rogue</option>
              <option value="sorcerer">Sorcerer</option>
              <option value="warlock">Warlock</option>
              <option value="wizard">Wizard</option>
            </select> 
          </div>
          <div className="mb-3">
            <label htmlFor="Level" className="form-label px-0">
              Character Level
            </label>
            <select 
              className="form-select" 
              id="level"
              name="level" 
              value={characterLevel} 
              onChange={(e) => setCharacterLevel(e.target.value)}
              required
            >
              <option value="" disabled>Choose a level...</option>
              {[...Array(20)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select> 
          </div>  
          <button type="submit" className="btn btn-primary button-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};
export default AddCharacter;