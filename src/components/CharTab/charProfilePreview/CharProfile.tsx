import { Assets } from "../../../lib/assets";
import { Character } from "../../../lib/models/Character";
import CharSkillSetPreview from "./CharSkills";
import { CinemaPreview } from "./CinemaSvg";


const CharProfile = ({ char }: { char: Character }) => {
    if (!char.name) {
        return (<div className="card-primary w-[420px] h-[750px]" />);
    }

    const { charMetadata } = char;

    const CharTitle = () => (
        <div className="absolute flex h-18 w-auto gap-2 z-30">
            <img src={Assets.getRarity(charMetadata.rarity)} className="w-16 h-16" />
            <span className="text-[36px] py-0.5 w-[220px] leading-none drop-shadow-primary capitalize"> {char.name.toLowerCase()} </span>
            <span className="py-[7px] drop-shadow-primary"> Lv.<span className="text-[24px]">{char.lvl} </span></span>
        </div>
    );

    return (
        <div className="card-primary w-[420px] h-[750px]">
            <img alt={char.name} src={Assets.getCharacterAvatarById(char.id)} className="absolute max-w-none top-0 -left-6 h-[750px] z-10 opacity-65" />
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