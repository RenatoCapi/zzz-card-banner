import { useState } from "react";
import DB from "../../lib/DB/db";
import { SaveState } from "../../lib/DB/saveState";
import { ServiceEnka } from "../../lib/importer/enka_parser";
import { ServiceHoyolab } from "../../lib/importer/hoyolab_parser";
import { Character } from "../../lib/models/Character";
import { AvatarEnka, EnkaData } from "../../lib/types/enka_types";
import { HoyolabData } from "../../lib/types/hoyolab_types";
import TooltipBox from "../TooltipBox";


const ButtonImportFile = () => {
    const [msg, setMsg] = useState("");
    const [active, setActive] = useState(false);

    const blinkTooltip = () => {
        setActive((prev) => !prev)
        setTimeout(() => {
            setActive((prev) => !prev);
        }, 2000);
    };

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
            const json = JSON.parse(result);
            loadData(json);
            setMsg("Characters loaded!");
        };

        blinkTooltip();
    }

    return (
        <label className="flex relative z-50 justify-center my-4 ">
            <TooltipBox msg={msg} active={active} />
            <input type="file" onChange={useImportFile} accept="application/json" className="block w-full button-base file:h-full file:opacity-90 file:border-hidden" title="json load" />
        </label>
    )
}

export default ButtonImportFile