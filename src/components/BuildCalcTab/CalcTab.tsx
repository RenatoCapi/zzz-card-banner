import { Assets } from "../../lib/assets";
import DB from "../../lib/DB/db";
import { TerminalCommands } from "./TerminalCommands";
import { useCalcTabStore } from "./UseCalcStore";


const TerminalLabel = () => {
    const { chainInstructions, rawInstruction, suggestions } = useCalcTabStore();
    const { setChainInstructions, setRawInstruction, setSuggestions, addInstruction, setMainDPS } = useCalcTabStore();
    const terminal = new TerminalCommands();
    terminal.loadCommands();

    const handleKeyDown = (event: any) => {


        if (event.key === "Tab") {
            event.preventDefault();
            if (!suggestions.length)
                return;

            addInstruction(suggestions[0]);
            const instructions = useCalcTabStore.getState().chainInstructions;
            setRawInstruction(instructions.join(" ") + " ")
            setSuggestions([]);
        }

        if (event.key === "Enter") {
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
    }

    const handleInput = (event: any) => {
        const fullLineGroups: string[] = event.target.value.match(/(\S+)/g);
        setRawInstruction(event.target.value);
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
        <div className="div-input-calc">
            <label className="p-2">Phaeton&#126;&#35;</label>
            <div className="relative flex flex-col">
                <input type="text" className="p-2 w-[600px] rounded-md bg-stone-950 focus:outline-none" onInput={handleInput} value={rawInstruction} onKeyDown={handleKeyDown} />
                <div className="absolute flex p-2 top-0 g-2">
                    <div className="text-black/0 h-[26px] shadow-md rounded-md bg-green-500/70 z-30">
                        {chainInstructions.join(" ") + " "}
                    </div>
                    <DropdownSuggs />
                </div>
            </div>
        </div>
    )
}

const MainDPSpfp = () => {
    const { mainDPS } = useCalcTabStore();
    if (mainDPS.id === 0)
        return (<></>);

    return (
        <img src={Assets.getRole(mainDPS.id)} className="w-auto h-32 max-w-none" />
    )
}

const CalcTab = () => {

    return (
        <div className="w-full flex-col h-[890px] p-2">

            <div className="flex m-auto w-fit gap-2 bg-stone-900 rounded-2xl">
                <div className="flex relative gap-2 mx-10 my-2 bg-stone-900 rounded-2xl">
                    <div className="relative h-[840px] my-2">
                        <div className="flex flex-col bg-stone-950 shadow-inner border-2 border-stone-800 border-opacity-75 rounded-xl">
                            <TerminalLabel />
                            <div className="h-[400px]">

                            </div>
                        </div>
                        <div className="absolute size-32 bottom-4 left-0">
                            <MainDPSpfp />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}


export default CalcTab