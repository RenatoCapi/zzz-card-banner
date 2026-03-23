import { Assets } from "../../../lib/assets";
import { Character } from "../../../lib/models/Character";
import { CharMetadata } from "../../../lib/models/CharMetadata";
import CharSkillSetPreview from "./CharSkills";
import { CinemaPreview } from "./CinemaSvg";


const CharProfile = (props: { char: Character }) => {
    const { char } = props;
    const cardStyle = "card-primary w-[420px] h-[750px] ";

    if (!char.name)
        return (<div className={cardStyle} />);


    return (
        <div className={cardStyle}>
            <img alt={char.name} src={Assets.getCharacterAvatarById(char.id)}
                className="img-cinema-char-profile" />
            <div className="relative w-full h-full">
                <CharTitle char={char} />
                <CinemaPreview charMovie={char.rank} />
                <CharSkillSetPreview skillSet={char.skillKit.skillDict} />
                <WeaponAnomalyIcon charMetadata={char.charMetadata} />
            </div>
        </div>
    )
}

const WeaponAnomalyIcon = (prop: { charMetadata: CharMetadata }) => {
    const { charMetadata } = prop;
    return (
        <div className="flex items-end absolute bottom-0 right-0 h-11 gap-2 z-30">
            <img src={Assets.getWeapon(charMetadata.weapon)} className="h-8 drop-shadow-white" />
            <img src={Assets.getElement(charMetadata.elementId)} className="h-11 drop-shadow-white" />
        </div>
    );
}

const CharTitle = (props: { char: Character }) => {
    const { char } = props;

    return (

        <div className="absolute flex h-18 w-auto gap-2 z-30">
            <img src={Assets.getRarity(char.charMetadata.rarity)} className="size-16" />
            <span className="py-0.5 w-55">
                <h1>{char.name.toLowerCase()}</h1>
            </span>
            <span className="py-2.25 text-shadow-lg/25"> Lv.<span className="text-2xl">{char.lvl} </span>
            </span>
        </div>
    );
}
export default CharProfile