import { Assets } from "../../lib/assets"
import ButtonClearCache from "./ButtonClearCache"
import ButtonImportFile from "./ButtonLoadFile"

const ImportTab = () => {
    return (
        <div className="flex items-center justify-center w-full h-fit">
            <div className="flex flex-col items-center justify-center">
                <span className="text-4xl my-8">Instructions</span>
                <div className="flex relative flex-row gap-2 ">
                    <ButtonImportFile />
                    <ButtonClearCache />
                </div>
                <span className="self-start text-2xl my-8">First method:</span>
                <span>
                    Use
                    <a className="text-blue-500" href="https://github.com/RenatoCapi/HOYOLAB_ZZZ_scraper/releases" target="_blank"> this scraper </a>
                    for get your all characters and run with this infos:
                </span>
                <img className="my-8" src={Assets.getTutorialAllChars()} />
                <br />
                <span className="self-start text-2xl my-8">Second method:</span>
                <img className="my-8" src={Assets.getTutorialSingleChar()} />

            </div>
        </div>
    )
}

export default ImportTab