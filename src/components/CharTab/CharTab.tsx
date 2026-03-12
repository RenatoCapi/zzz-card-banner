import { lazy, Suspense, useRef } from "react"
import { Assets } from "../../lib/assets"
import DB from "../../lib/DB/db"
import { Character } from "../../lib/models/Character.ts"
import CharProfile from "./charProfilePreview/CharProfile"
import CharStatSummary from "./charStatPreview/CharStatsSummary"
import DiscSetPreview from "./discSetPreview/DiscSetPreview.tsx"
import { useCharacterTabStore } from "./useCharacterTabStore.ts"

const CharacterTabController = {
    buttonClickedListener: (char: Character) => {
        useCharacterTabStore.getState().setFocusCharacter(char.id)
    },

}

const CharTab = () => {
    const refToImage = useRef<HTMLDivElement>(null);

    const MenuChars = () => {
        return (
            <div className="flex flex-row mx-2 mt-2 max-w-[1150px] self-center overflow-x-auto scrollbar-thin over">
                {Object.values(DB.getCharactersById()).reverse().map((value, jsx_index) => (
                    <div key={jsx_index}>
                        <button type="button" onClick={() => CharacterTabController.buttonClickedListener(value)}>
                            <img src={Assets.getRole(value.id)} className="w-auto h-[80px] max-w-none" />
                        </button>
                    </div>
                ))}
            </div>
        );
    }

    const LazyPngButton = lazy(() => import("./ButtonToPng"));
    const LazyDownloadButton = lazy(() => import("./ButtonDownload"));

    const ContentChar = () => {
        const selectedCharacter = useCharacterTabStore((s) => s.selectedCharacter);
        return (
            <div className="flex relative gap-2 m-2 bg-stone-900 rounded-2xl">
                <Suspense>
                    <div ref={refToImage} className="flex gap-2 p-2 bg-stone-900 rounded-2xl">
                        <div className="flex gap-2 bg-stone-900 rounded-2xl">
                            <CharProfile char={selectedCharacter} />
                        </div>

                        <div className="flex flex-col">
                            <CharStatSummary char={selectedCharacter} />
                        </div>

                        <div className="flex flex-col">
                            <DiscSetPreview discSet={selectedCharacter.discSet} />
                        </div>
                    </div>
                </Suspense>
                <div className="flex absolute flex-row gap-2 m-auto w-fit z-50 right-1/2 translate-x-1/2 pr-2
                          opacity-30 delay-200 duration-500 ease-in-out hover:opacity-90">
                    <Suspense>
                        <LazyPngButton refDiv={refToImage} />
                        <LazyDownloadButton refDiv={refToImage} name={selectedCharacter.name} />
                    </Suspense>
                </div>
            </div>
        );
    }

    // useEffect(() => {
    //     if (char !== DB.getActiveChar()) {
    //         DB.setActiveChar(char)
    //         SaveState.save()
    //     }
    // }, [char])

    return (
        <div className="w-full flex-col">
            <div className="flex m-auto w-fit">
                <div className="flex flex-col items-start">
                    <MenuChars />
                    <ContentChar />
                </div>
            </div>

        </div >
    )
}


export default CharTab