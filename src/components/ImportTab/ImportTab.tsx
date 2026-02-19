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
                <span>
                    <div className="flex relative flex-row gap-4">

                        <div className="flex flex-col gap-2 justify-center">
                            <span>You can import your characters with EnkaAPI's json format: </span>
                            <span>"https://enka.network/api/zzz/uid/<span className="text-green-500">[put your UID here]</span>" </span>
                            <span>And save this file .json to load here.</span>
                        </div>

                        <a href="https://enka.network/?zzz" target="_blank">
                            <img className="my-8" src={Assets.getEnkaLogo()} />
                        </a>
                    </div>
                    <br />
                </span>
                <span className="self-start text-2xl my-8">Another more complicated method (It'll get your all characters):</span>
                <span>
                    Use
                    <a className="text-blue-500" href="https://github.com/RenatoCapi/HOYOLAB_ZZZ_scraper/releases" target="_blank"> this scraper </a>
                    to get all your characters' data. You'll need run it with this info:
                </span>
                <img className="my-8" src={Assets.getTutorialAllChars()} />
                <br />
                <span className="self-start text-2xl my-8">Manual method:</span>
                <img className="my-8" src={Assets.getTutorialSingleChar()} />

            </div>
        </div>
    )
}

export default ImportTab