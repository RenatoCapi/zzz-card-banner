import { KeyboardEvent, SyntheticEvent } from "react";
import { TerminalCmd } from "../TerminalCommands";
import { CalcTabController as RotationTabController, useCalcTabStore } from "../UseCalcStore";

type KeyDown = (event: KeyboardEvent<HTMLInputElement>) => void;

type EventMapType = { [id: string]: KeyDown }

export const TerminalLabel = () => {
    const {
        labelText, setLabelText,
        suggestions, setSuggestions,
        chainInstructions, setChainInstructions,
        setPossibleCommands,
        suggestionFocus, setSuggestionFocus,
    } = useCalcTabStore();

    const possibleCommands = useCalcTabStore(s => s.possibleCommands);


    const keyDownTab = (event: KeyboardEvent<HTMLInputElement>) => {
        event.preventDefault();

        if (!suggestions.length) {
            mountSuggestions(chainInstructions);
            return;
        }

        RotationTabController.addInstruction(suggestions[suggestionFocus]);
    }

    const keyDownEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        RotationTabController.executeInstruction();
    }

    const keyDownArrowUp = (event: KeyboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        const prevIndex = Math.max(suggestionFocus - 1, 0)
        setSuggestionFocus(prevIndex);

    }

    const keyDownArrowDown = (event: KeyboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        const nextIndex = Math.min(suggestionFocus + 1, suggestions.length - 1)
        setSuggestionFocus(nextIndex);
    }

    const EventMap: EventMapType = {
        "Tab": keyDownTab,
        "Enter": keyDownEnter,
        "ArrowUp": keyDownArrowUp,
        "ArrowDown": keyDownArrowDown,
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
        RotationTabController.resetSuggestions();

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



    return (
        <div className="div-input-calc">
            <label className="p-2">Phaeton&#126;&#35;</label>
            <div className="relative flex flex-col">
                <input type="text" className="p-2 w-[600px] rounded-md bg-stone-950 focus:outline-none" onInput={(handleInput)} value={labelText} onKeyDown={handleKeyDown} />
                <div className="absolute flex p-2 top-0 g-2">
                    <div className="text-black/0 h-[26px] shadow-md rounded-md bg-lime-400/60 z-30">
                        {chainInstructions.join(" ") + " "}
                    </div>
                    <DropdownSuggestions />
                </div>
            </div>
        </div>
    )
}


const DropdownSuggestions = () => {
    const { suggestions, suggestionFocus } = useCalcTabStore();

    const styleBase = `px-1`;
    const isFocus = (index: number) => (
        styleBase + (suggestionFocus === index ? ` bg-stone-600` : ` `)
    );

    if (!suggestions.length)
        return (<></>);

    return (
        <div className="relative flex-col border top-10 z-30 border-stone-600 overflow-hidden max-h-[400px] bg-stone-950/80 ">
            {suggestions.map((sugg, index) => (
                <div key={index} className={isFocus(index)}>{sugg}</div>
            ))}
        </div>
    );
}
