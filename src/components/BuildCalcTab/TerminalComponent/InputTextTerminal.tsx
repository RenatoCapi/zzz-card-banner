import { KeyboardEvent, SyntheticEvent } from "react";
import DB from "../../../lib/DB/db";
import { TerminalCommands } from "../TerminalCommands";
import { useCalcTabStore } from "../UseCalcStore";

export const TerminalLabel = () => {
    const { chainInstructions, setChainInstructions } = useCalcTabStore();
    const { rawInstruction, setRawInstruction } = useCalcTabStore();
    const { suggestions, setSuggestions } = useCalcTabStore();
    const { addInstruction, setMainDPS } = useCalcTabStore();

    const terminal = new TerminalCommands();
    terminal.loadCommands();

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Tab") keyDownTabEvent(event);
        if (event.key === "Enter") keyDownEnterEvent(event);

    }

    const keyDownTabEvent = (event: KeyboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (!suggestions.length)
            return;

        addInstruction(suggestions[0]);
        const instructions = useCalcTabStore.getState().chainInstructions;
        setRawInstruction(instructions.join(" ") + " ")
        setSuggestions([]);
    }

    const keyDownEnterEvent = (event: KeyboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        try {
            const instructions = useCalcTabStore.getState().chainInstructions;
            const charId = terminal.commands[instructions[0]][instructions[1]][instructions[2]];
            terminal.env.mainDPS = DB.getCharacterById(charId);
            setMainDPS(terminal.env.mainDPS);
            console.log(terminal);
        } catch (e) {
            console.log(e);
        }
    }

    const handleInput = (event: SyntheticEvent<HTMLInputElement>) => {
        if (!(event.target instanceof HTMLInputElement))
            return;

        const inputValue = (event.target as HTMLInputElement).value;
        const fullLineGroups = inputValue.match(/(\S+)/g);

        if (!fullLineGroups)
            return;

        setRawInstruction(inputValue);
        checkAllCommand(fullLineGroups);
    }

    const checkAllCommand = (fullLineGroups: string[]) => {
        let dataAux: any = terminal.commands;
        let keysAux: string[] = [];
        setSuggestions([]);

        if (!fullLineGroups || !fullLineGroups.length) {
            setChainInstructions([]);
            return;
        }

        console.log("input");
        fullLineGroups.forEach((word) => {
            if (Object.keys(dataAux).includes(word)) {
                keysAux.push(word);
                dataAux = dataAux[word];
                return;
            }

            const suggestions = Object.keys(dataAux).filter(
                option => option.startsWith(word)
            );
            setSuggestions(suggestions);
        });

        setChainInstructions(keysAux);
    }

    const DropdownSuggestions = () => {
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
        <div className="div-input-calc">
            <label className="p-2">Phaeton&#126;&#35;</label>
            <div className="relative flex flex-col">
                <input type="text" className="p-2 w-[600px] rounded-md bg-stone-950 focus:outline-none" onInput={(handleInput)} value={rawInstruction} onKeyDown={handleKeyDown} />
                <div className="absolute flex p-2 top-0 g-2">
                    <div className="text-black/0 h-[26px] shadow-md rounded-md bg-green-500/70 z-30">
                        {chainInstructions.join(" ") + " "}
                    </div>
                    <DropdownSuggestions />
                </div>
            </div>
        </div>
    )
}