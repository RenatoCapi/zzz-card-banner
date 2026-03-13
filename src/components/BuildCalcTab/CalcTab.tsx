import { useState } from "react";
import DB from "../../lib/DB/db";
import { Character } from "../../lib/models/Character";
import { commands, CommandsKeys, TerminalCommands } from "./TerminalCommands";
import { useCalcTabStore } from "./UseCalcStore";


const CalcTab = () => {
    const terminal = new TerminalCommands();
    const suggestions = useCalcTabStore((state) => state.suggestions)
    const suggPos = useCalcTabStore((state) => state.chainInstructions);
    const [selectInstruction, setSelectInstruction] = useState("");
    const primaryOptions = Object.keys(commands);
    let selectParam = "";


    const handleChange = (event: any) => {
        const fullLineGroups: string[] = event.target.value.match(/(\S+)/g);
        //const lastCommand: string[] = event.target.value.match(/(\S)$/);

        checkAllCommand(fullLineGroups);

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
            if (!checkCommand(fullLineGroups[1], secondOptions, fullLineGroups[0] + " ")) return;
        }

        if (fullLineGroups.length === 3) {
            terminal.loadChars();
            const thirdOptions = Object.keys(terminal.charsDict);

            console.log(thirdOptions)
            if (!checkCommand(fullLineGroups[2], thirdOptions, fullLineGroups[0] + " " + fullLineGroups[1] + " ")) return;
        }
    }

    const checkAllCommand = (fullLineGroups: string[]) => {
        let dataAux: any = commands;
        let keysAux: string[] = [];
        useCalcTabStore.getState().setSuggestions([]);

        fullLineGroups.forEach((word) => {
            if (Object.keys(dataAux).includes(word)) {
                keysAux.push(word);
                dataAux = dataAux[word];
                return;
            }

            const suggestions = Object.keys(dataAux).filter(option => option.startsWith(word));

            useCalcTabStore.getState().setSuggestions(suggestions);
        });

        useCalcTabStore.getState().setChainInstructions(keysAux);
    }

    //add 


    const checkCommand = (word: string, options: string[], pos: string) => {
        console.log(options);
        setSuggestions(options.filter(option => option.startsWith(word)));
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
                                    <div className="relative flex flex-col">
                                        <input type="text" className="p-2 w-[600px] rounded-md bg-stone-950 focus:outline-none" onChange={handleChange} />
                                        <div className="absolute flex p-2 top-0 g-2">
                                            <div className="text-green-600 h-[26px] shadow-md bg-opacity-0">{suggPos}</div>
                                            <div className="relative flex-col border top-10 border-stone-600">
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