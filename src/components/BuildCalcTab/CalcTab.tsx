import { useState } from "react";
import DB from "../../lib/DB/db";
import { Character } from "../../lib/models/Character";
import { Environment } from "../../lib/models/Environment";
import { commands, CommandsKeys } from "./TerminalCommands";


const CalcTab = () => {
    const env = new Environment();
    const [suggestions, setSuggestions] = useState([""])


    const handleChange = (event: any) => {
        const pattern = /(\w+)/g;
        const groups = event.target.value.toLowerCase().match(pattern);
        setSuggestions([""])

        if (!groups) {
            return;
        }

        const primaryOptions = Object.keys(commands);
        setSuggestions(primaryOptions.filter(option => option.toLowerCase().includes(groups[0])))
        console.log(suggestions)

        if (!Object.keys(commands).includes(groups[0])) {
            return;
        }

        const commandprimary: CommandsKeys = groups[0];
        console.log(commands[commandprimary])

        if (!commands[commandprimary].includes(groups[1])) {
            return;
        }

        console.log(groups[1])



    }

    return (
        <div className="w-full flex-col h-[890px] p-2">
            <div className="w-full flex-col">
                <div className="flex m-auto w-fit gap-2 bg-stone-900 rounded-2xl">
                    <div className="flex relative gap-2 mx-10 my-2 bg-stone-900 rounded-2xl">
                        <div className="h-[850px] my-2">
                            <div className="flex bg-stone-950 shadow-inner border-2 border-stone-800 border-opacity-75 rounded-xl">
                                <div className="relative flex m-5 bg-stone-950 rounded-lg border-2 border-stone-700 h-fit hover:border-stone-900 transition duration-300">
                                    <label className="p-2">Phaeton&#126;&#35;</label>
                                    <div>
                                        <input type="text" className="p-2 w-[600px] rounded-md bg-stone-950 focus:outline-none" onChange={handleChange} />
                                        <div className="absolute flex -bottom-6 border border-stone-600 mx-2">
                                            {suggestions.map((sugg) => (
                                                <div>{sugg}</div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="h-[400px]">

                                </div>
                            </div>
                            <div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



const SelectChar = () => {
    const [selectedOption, setSelectedOption] = useState<string>('');

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.clear();
        // const char = DB.getCharacterById(event.target.value);
        // new SkillCalc(char.skillKit).calcAllSkillsMult();
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