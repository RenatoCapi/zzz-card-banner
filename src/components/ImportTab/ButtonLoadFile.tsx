import React, { useRef, useState } from "react";
import DB from "../../lib/DB/db";
import { SaveState } from "../../lib/DB/saveState";
import { ServiceEnka } from "../../lib/importer/enka_parser";
import { ServiceHoyolab } from "../../lib/importer/hoyolab_parser";
import { Character } from "../../lib/models/Character";
import { AvatarEnka, EnkaData } from "../../lib/types/enka_types";
import { HoyolabData } from "../../lib/types/hoyolab_types";
import ButtonClearCache from "./ButtonClearCache";


const ButtonImportFile = () => {
    const [msg, setMsg] = useState("Paste your json here!");
    const inputFile = useRef<HTMLInputElement>(null);

    const blinkTooltip = () => {
        setTimeout(() => {
            setMsg("Paste your json here!");
        }, 2000);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const loadData = (json: any) => {
        const arrAux = Array.isArray(json) ? json : [json];
        let charAux: Character;
        if ("PlayerInfo" in arrAux[0]) {
            const jsonEnka = arrAux[0] as EnkaData;
            const EnkaAvatarList = jsonEnka.PlayerInfo.ShowcaseDetail.AvatarList;
            EnkaAvatarList.forEach((value: AvatarEnka) => {
                charAux = new ServiceEnka(value).buildCharacter();
                DB.setCharacter(charAux);
            })
        } else if ("data" in arrAux[0]) {
            arrAux.forEach((value: HoyolabData) => {
                charAux = new ServiceHoyolab(value).buildCharacter();
                DB.setCharacter(charAux);
            })
        }


        SaveState.save();
    }

    const useImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files[0]) {
            setMsg("Loading error!");
            return;
        }

        const updatedJSON = e.target.files[0];
        if (updatedJSON.type !== "application/json") {
            setMsg("File is not a json!");
            return;
        }

        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = (e) => {
            const target = e.target;
            if (target === null)
                return;

            const result = target.result as string;
            loadData(JSON.parse(result));
            setMsg("Characters loaded!");
        };

        blinkTooltip();
    }

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        try {
            event.preventDefault();
            const pastedText = event.clipboardData.getData('Text');
            const processedText = pastedText.trim();
            loadData(JSON.parse(processedText));
            setMsg("Characters loaded!");
            console.log('Pasted:', processedText);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        catch (e) {
            setMsg("Loading error!");
        }
        blinkTooltip();
    };

    const clickFileHandle = () => {
        if (inputFile.current !== null)
            inputFile.current.click();
    }

    return (
        <div className="relative flex flex-row gap-4">

            <div tabIndex={0} onPaste={handlePaste} className="grid h-40 w-120 rounded-lg border-2 border-taupe-900/50 bg-taupe-800 hover:bg-taupe-700 pointer-events-auto focus:outline-2 focus:outline-offset-2 focus:outline-orange-600 place-content-center focus:bg-taupe-700">
                <span className="text-taupe-300/80 text-2xl">{msg}</span>

                <input type="file" ref={inputFile} onChange={useImportFile} accept="application/json" className=" w-full button-base file:h-full file:opacity-90 file:border-hidden hidden" title="json load" />


            </div>
            <div className="grid grid-row-2 place-content-center p-2 gap-2 items-stretch">
                <button className="py-1 px-2 my-4 button-base" onClick={clickFileHandle}>Load File</button>
                <ButtonClearCache />
                {/* <TooltipBox msg={msg} active={isActive} /> */}
            </div>
        </div >
    )
}

export default ButtonImportFile