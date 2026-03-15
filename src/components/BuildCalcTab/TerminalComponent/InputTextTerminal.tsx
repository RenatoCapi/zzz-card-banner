import { KeyboardEvent, SyntheticEvent } from "react";
import { CalcTabController, useCalcTabStore } from "../UseCalcStore";

type KeyDown = (event: KeyboardEvent<HTMLInputElement>) => void;

export const TerminalLabel = () => {
    const { rawInstruction, setRawInstruction } = useCalcTabStore();
    const { suggestions, setSuggestions } = useCalcTabStore();
    const { chainInstructions, setChainInstructions } = useCalcTabStore();
    const { terminal } = useCalcTabStore();
    terminal.loadCommands();

    const keyDownTabEvent = (event: KeyboardEvent<HTMLInputElement>) => {
        event.preventDefault();

        // TODO apertar tab sem nada daria a lista de todos os comandos/parametros possíveis
        if (!suggestions.length)
            return;

        CalcTabController.addInstruction(suggestions[0]);
    }

    const keyDownEnterEvent = (event: KeyboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        CalcTabController.executeInstruction();
    }

    const EventMap: { [id: string]: KeyDown } = {
        "Tab": keyDownTabEvent,
        "Enter": keyDownEnterEvent,
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (Object.keys(EventMap).includes(event.key))
            EventMap[event.key](event);
    }

    const handleInput = (event: SyntheticEvent<HTMLInputElement>) => {
        if (!(event.target instanceof HTMLInputElement)) {

            return;
        }

        const inputValue = (event.target as HTMLInputElement).value;
        const fullLineGroups = inputValue.match(/(\S+)/g);

        if (!fullLineGroups) {
            setRawInstruction("");
            return;
        }

        setRawInstruction(inputValue);
        checkAllCommand(fullLineGroups);
    }

    const checkAllCommand = (fullLineGroups: string[]) => {
        let dataAux: any = useCalcTabStore.getState().terminal.commands;
        console.log(dataAux);
        let keysAux: string[] = [];
        setSuggestions([]);

        if (!fullLineGroups || !fullLineGroups.length) {
            setChainInstructions([]);
            return;
        }

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