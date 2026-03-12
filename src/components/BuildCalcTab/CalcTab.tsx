import { useState } from "react";
import DB from "../../lib/DB/db";
import { Character } from "../../lib/models/Character";
import { commands, CommandsKeys, TerminalCommands } from "./TerminalCommands";


const CalcTab = () => {
    const terminal = new TerminalCommands();
    const [suggestions, setSuggestions] = useState([""]);
    const [suggPos, setSuggPos] = useState("");
    const [selectInstruction, setSelectInstruction] = useState("");
    const primaryOptions = Object.keys(commands);
    let selectParam = "";


    const handleChange = (event: any) => {
        const fullLineGroups: string[] = event.target.value.toLowerCase().match(/(\S+)/g);
        setSuggestions([""]);
        console.log(event)

        if (!fullLineGroups) {
            return;
        }

        if (fullLineGroups.length === 1) {
            if (!checkCommand(fullLineGroups[0], primaryOptions, "")) return;
        }

        if (fullLineGroups.length === 2) {
            const secondOptions = Object.values(commands[fullLineGroups[0] as CommandsKeys]);
            if (!checkCommand(fullLineGroups[1], secondOptions, fullLineGroups[0] + "I")) return;
            // console.log(secondOptions);
            // const secondWord = fullLineGroups[1];
            // setSuggestions(secondOptions.filter(option => option.toLowerCase().includes(secondWord)));
            // setSuggPos(selectInstruction + "I")
            // if (!secondOptions.includes(secondWord)) {
            //     selectParam = "";
            //     return;
            // }

            // selectParam = secondWord;
            // console.log(suggestions);
        }
    }

    const checkCommand = (word: string, options: string[], pos: string) => {
        console.log(options);
        setSuggestions(options.filter(option => option.toLowerCase().includes(word)));
        setSuggPos(pos);
        if (options.includes(word)) {
            setSelectInstruction(word)
            return true;

        }
        setSelectInstruction("");
        return false;
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

                                        <div className="absolute flex top-11 p-2">
                                            {Array.from(suggPos).map((value) => (
                                                <span className="opacity-0">{value}</span>
                                            ))}
                                            <div className="flex-col border border-stone-600">
                                                {suggestions.map((sugg, index) => (
                                                    <div key={index}>{sugg}</div>
                                                ))}
                                            </div>
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