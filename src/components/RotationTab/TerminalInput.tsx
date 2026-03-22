import { KeyboardEvent, RefObject, SyntheticEvent, useEffect, useRef } from "react";
import { filterSuggestionsList } from "../../lib/Utils";
import { TerminalCmd } from "./TerminalCommands";
import { CalcTabController, CalcTabController as RotationTabController, useCalcTabStore } from "./UseCalcStore";

type KeyDown = (event: KeyboardEvent<HTMLInputElement>) => void;

export type EventKeyMapType = { [id: string]: KeyDown }

export const TerminalInputText = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    const {
        labelText, setLabelText,
        suggestions, setSuggestions,
        chainInstructions, setChainInstructions,
        suggestionFocus, setSuggestionFocus,
        setPossibleCommands,
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

    const EventMap: EventKeyMapType = {
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
            CalcTabController.resetSuggestions();
            CalcTabController.resetInputText();
            return;
        }

        setLabelText(inputValue);
        checkCommandLine(fullLineGroups);
    }

    const checkCommandLine = (fullLineGroups: string[]) => {
        if (Object.keys(possibleCommands).length === 0)
            setPossibleCommands(TerminalCmd.instance.possibleCommands);

        if (!fullLineGroups.length) {
            setChainInstructions([]);
            return;
        }



        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let commandLayer: any = possibleCommands;
        const instructionsAux: string[] = [];
        RotationTabController.resetSuggestions();

        fullLineGroups.forEach((word) => {
            commandLayer = (typeof commandLayer === "function") ? commandLayer() : commandLayer;

            if (Object.keys(commandLayer).includes(word)) {
                instructionsAux.push(word);
                commandLayer = commandLayer[word];
                return;
            }

            setSuggestions(filterSuggestionsList(word, commandLayer));
        });

        setChainInstructions(instructionsAux);
    }

    const mountSuggestions = (chainInstructions: string[]) => {
        console.log(chainInstructions);

        if (Object.keys(possibleCommands).length === 0)
            setPossibleCommands(TerminalCmd.instance.possibleCommands);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let dataAux: any = possibleCommands;
        const keysAux: string[] = [];

        chainInstructions.forEach((word) => {
            keysAux.push(word);

            dataAux = typeof dataAux[word] === "function" ? dataAux[word]() : dataAux[word];
        });

        // eslint-disable-next-line no-prototype-builtins
        if (dataAux.hasOwnProperty("dmg")) {
            setSuggestions([]);
            return;
        }

        setSuggestions(Object.keys(dataAux));
    }

    useEffect(() => {
        inputRef.current?.focus();
    }, []);


    return (
        <div className="div-input-calc">
            <label className="p-2 text-cyan-400">Phaeton&#126;&#35;</label>
            <div className="relative flex flex-col">
                <input type="text" spellCheck="false" className="p-2 w-[600px] rounded-md justify-center bg-stone-950 focus:outline-none no" onInput={(handleInput)} value={labelText} onKeyDown={handleKeyDown} ref={inputRef} />
                <div className="absolute flex top-10 left-1">
                    <ValidGreenBox />
                    <DropdownSuggestionsBox inputRef={inputRef} />
                </div>
            </div>
        </div>
    )
}

const ValidGreenBox = () => {
    const { chainInstructions } = useCalcTabStore();

    if (!chainInstructions.length) {
        return (<></>);
    }
    return (
        <div className="green-box -top-[31px] left-[2px] p-0.5 z-30">
            {chainInstructions.join(" ") + " "}
        </div>
    );
}


const DropdownSuggestionsBox = ({ inputRef }: { inputRef: RefObject<HTMLInputElement | null> }) => {
    const { suggestions, suggestionFocus } = useCalcTabStore();

    const styleBase = ` px-[2px] cursor-pointer hover:bg-stone-800/70`;
    const isFocus = (index: number) => (
        (suggestionFocus === index ? `bg-stone-600/70` : ``) + styleBase
    );

    const clickHandler = (sugg: string) => {
        RotationTabController.addInstruction(sugg);
        if (inputRef.current)
            inputRef.current.focus();
    }

    if (!suggestions.length)
        return (<></>);

    return (
        <div className="relative flex-col top-0.5 z-30 border-2 border-stone-600/70 overflow-hidden max-h-[400px] bg-stone-950/80 ">
            {suggestions.map((sugg, index) => (
                <div key={index} className={isFocus(index)} onClick={() => clickHandler(sugg)}>{sugg}</div>
            ))}
        </div>
    );
}
