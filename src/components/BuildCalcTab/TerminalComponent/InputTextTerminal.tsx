import { KeyboardEvent, SyntheticEvent } from "react";
import { TerminalCmd } from "../TerminalCommands";
import { CalcTabController, useCalcTabStore } from "../UseCalcStore";

type KeyDown = (event: KeyboardEvent<HTMLInputElement>) => void;

export const TerminalLabel = () => {
    const {
        labelText, setLabelText,
        suggestions, setSuggestions,
        chainInstructions, setChainInstructions,
        setPossibleCommands
    } = useCalcTabStore();

    const possibleCommands = useCalcTabStore(s => s.possibleCommands);


    const keyDownTabEvent = (event: KeyboardEvent<HTMLInputElement>) => {
        event.preventDefault();

        // TODO apertar tab sem nada daria a lista de todos os comandos/parametros possíveis
        if (!suggestions.length) {
            mountSuggestions(chainInstructions);
            return;
        }

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
            setLabelText("");
            return;
        }

        setLabelText(inputValue);
        checkAllCommand(fullLineGroups);
    }

    const checkAllCommand = (fullLineGroups: string[]) => {
        if (Object.keys(possibleCommands).length === 0)
            setPossibleCommands(TerminalCmd.instance.commands);

        let dataAux: any = possibleCommands;
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

            const suggStartWith = Object.keys(dataAux).filter(
                option => option.startsWith(word)
            );

            const suggMatch = Object.keys(dataAux).filter(
                option => option.match(word)
            );

            const suggs = [...new Set([...suggStartWith, ...suggMatch])]

            setSuggestions(suggs);
        });

        setChainInstructions(keysAux);
    }

    const mountSuggestions = (chainInstructions: string[]) => {
        if (Object.keys(possibleCommands).length === 0)
            setPossibleCommands(TerminalCmd.instance.commands);

        let dataAux: any = possibleCommands;
        let keysAux: string[] = [];

        chainInstructions.forEach((word) => {
            keysAux.push(word);
            dataAux = dataAux[word];
        })

        setSuggestions(Object.keys(dataAux));
    }

    const DropdownSuggestions = () => {
        if (!suggestions.length)
            return (<></>);

        return (
            <div className="relative flex-col border top-10 border-stone-600 overflow-hidden max-h-[400px] bg-stone-950/80">
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
                <input type="text" className="p-2 w-[600px] rounded-md bg-stone-950 focus:outline-none" onInput={(handleInput)} value={labelText} onKeyDown={handleKeyDown} />
                <div className="absolute flex p-2 top-0 g-2">
                    <div className="text-black/0 h-[26px] shadow-md rounded-md bg-lime-400/70 z-30">
                        {chainInstructions.join(" ") + " "}
                    </div>
                    <DropdownSuggestions />
                </div>
            </div>
        </div>
    )
}