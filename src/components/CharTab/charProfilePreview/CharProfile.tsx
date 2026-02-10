import { Assets } from "../../../lib/assets";
import { Character } from "../../../lib/models/Character";
import CharSkillSetPreview from "./CharSkills";
import { CinemaPreview } from "./CinemaSvg";


const CharProfile = ({ char }: { char: Character }) => {
    const { charMetadata } = char;

    if (!char.name) {
        return (<div className="card-primary w-[420px] h-[750px]" />);
    }

    const CharTitle = () => (
        <div className="absolute flex h-18 w-auto gap-3 z-30">
            <img src={Assets.getRarity(charMetadata.rarity)} className="w-16" />
            <span className="text-[38px] py-0.5 leading-none drop-shadow-primary"> {char.name} </span>
            <span className="text-[24px] py-2 drop-shadow-primary"> Lv.{char.lvl} </span>
        </div>
    );

    return (
        <div className="card-primary w-[420px] h-[750px]">
            <img alt={char.name} src={Assets.getCharacterAvatarById(char.name)} className="absolute max-w-none top-0 -left-6 h-[750px] z-10 opacity-65" />
            <div className="relative w-full h-full">
                <CharTitle />
                <CinemaPreview charMovie={char.rank} />
                <CharSkillSetPreview skillSet={char.skillKit} />
                <div className="flex items-end absolute bottom-0 right-0 h-11 gap-2 z-30">
                    <img src={Assets.getWeapon(charMetadata.weapon)} className="h-8 drop-shadow-white" />
                    <img src={Assets.getElement(charMetadata.elementId)} className="h-11 drop-shadow-white" />
                </div>
            </div>
        </div>
    )
}

export default CharProfile