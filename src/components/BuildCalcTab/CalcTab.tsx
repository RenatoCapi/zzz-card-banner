import { useState } from "react";
import DB from "../../lib/DB/db";
import { Character } from "../../lib/models/Character";
import { TerminalCommands } from "./TerminalCommands";
import { useCalcTabStore } from "./UseCalcStore";


const CalcTab = () => {
    const terminal = new TerminalCommands();
    const suggestions = useCalcTabStore(s => s.suggestions);
    const suggPos = useCalcTabStore(s => s.chainInstructions);
    const rawInstruction = useCalcTabStore((s) => s.rawInstruction);


    const handleInput = (event: any) => {
        const fullLineGroups: string[] = event.target.value.match(/(\S+)/g);
        useCalcTabStore.getState().setRawInstruction(event.target.value);
        checkAllCommand(fullLineGroups);
    }

    const handleKeyDown = (event: any) => {
        if (event.key === "Tab") {

            event.preventDefault();
            const sugg = useCalcTabStore.getState().suggestions;
            if (!sugg.length)
                return;

            const commandChain = useCalcTabStore.getState().chainInstructions;
            useCalcTabStore.getState().setRawInstruction([...commandChain, sugg[0]].join(" ") + " ")
            useCalcTabStore.getState().setSuggestions([]);
        }

        if (event.key === "Enter") {
            event.preventDefault();
            try {
                const chainInstructions = useCalcTabStore.getState().chainInstructions;
                const commands: any = terminal.getCommands();
                console.log(chainInstructions);
                const charId = commands[chainInstructions[0]][chainInstructions[1]][chainInstructions[2]];
                terminal.env.mainDPS = DB.getCharacterById(charId);
                console.log(terminal.env.mainDPS.name + " adicionado!")
            } catch (e) {
                console.log(e);
            }
        }
    }

    const checkAllCommand = (fullLineGroups: string[]) => {
        console.log(terminal.getCommands());
        let dataAux: any = terminal.getCommands();
        let keysAux: string[] = [];
        useCalcTabStore.getState().setSuggestions([]);

        if (!fullLineGroups) {
            useCalcTabStore.getState().setChainInstructions([]);
            return;
        }

        fullLineGroups.forEach((word) => {
            if (Object.keys(dataAux).includes(word)) {
                keysAux.push(word);
                dataAux = dataAux[word];
                console.log(dataAux)
                return;
            }

            const suggestions = Object.keys(dataAux).filter(
                option => option.startsWith(word)
            );
            useCalcTabStore.getState().setSuggestions(suggestions);
        });

        useCalcTabStore.getState().setChainInstructions(keysAux);
    }

    const DropdownSuggs = () => {
        if (!suggestions.length)
            return (<></>);

        return (
            <div className="relative flex-col border top-10 border-stone-600">
                {suggestions.map((sugg, index) => (
                    <div key={index}>{sugg}</div>
                ))}
            </div>
        );
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
                                        <input type="text" className="p-2 w-[600px] rounded-md bg-stone-950 focus:outline-none" onInput={handleInput} value={rawInstruction} onKeyDown={handleKeyDown} />
                                        <div className="absolute flex p-2 top-0 g-2">
                                            <div className="text-opacity-0 h-[26px] shadow-md rounded-md bg-green-500/70 z-30">{suggPos.join(" ") + " "}</div>
                                            <DropdownSuggs />
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