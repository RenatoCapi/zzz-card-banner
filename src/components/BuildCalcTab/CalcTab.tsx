import { useState } from "react";
import DB from "../../lib/DB/db";
import { Character } from "../../lib/models/Character";




const CalcTab = () => {

    return (
        <div className="w-full flex-col">
            <div className="flex flex-row mx-2 mt-2 max-w-[1150px] self-center overflow-x-auto scrollbar-thin">
                <div className="flex min-h-[800px]">
                    <SelectChar />
                </div>
            </div>
        </div>
    )
}


const SelectChar = () => {
    const [selectedOption, setSelectedOption] = useState<string>('');

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.clear();
        const char = DB.getCharacterById(event.target.value);
        console.log(char.name);
        console.log(char.skillKit)
        //new SkillCalc(char.skillKit).calcAllSkillsMult();
        setSelectedOption(event.target.value);
    };

    return (
        <div>
            <label htmlFor="dropdown">Escolha uma opção:</label>
            <select id="dropdown" value={selectedOption} onChange={handleSelectChange}>
                {Object.values(DB.getCharactersById()).map((char: Character) => (
                    <option key={char.id} value={char.id}>{char.name}</option>
                ))}
            </select>
            <p>Opção selecionada: {selectedOption}</p>
        </div>
    );
}

export default CalcTab