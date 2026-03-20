import { Link, Route, Routes } from "react-router-dom"
import CharTab from "./CharTab/CharTab"
import ImportTab from "./ImportTab/ImportTab"
import RotationTab from "./RotationTab/RotationTab"
import { useAppStore } from "./UseAppStore"


const SideMenu = () => {
    const BASE_PATH = "/zzz-card-banner";
    const { sidebarState } = useAppStore();

    return (
        <div className={sidebarState ? 'side-menu-content w-[140px]' : 'side-menu-content w-0'}>
            <nav className="flex flex-col gap-1 p-2 w-full h-full">
                <Link to={BASE_PATH + "/"} className="side-menu-button">Characters</Link>
                <Link to={BASE_PATH + "/import"} className="side-menu-button">Import</Link>
                <Link to={BASE_PATH + "/calc"} className="side-menu-button">Calc</Link>
                {/* <Link to={BASE_PATH + "/test"} className="side-menu-button">Test</Link> */}
            </nav>
        </div>
    )
}

const Tabs = () => {
    const BASE_PATH = "/zzz-card-banner"
    return (
        <div className="flex flex-row box-border self-stretch min-h-fit min-w-fit">
            <SideMenu />
            <Routes>
                <Route path={BASE_PATH + "/"} element={<CharTab />} />
                <Route path={BASE_PATH + "/import"} element={<ImportTab />} />
                <Route path={BASE_PATH + "/calc"} element={<RotationTab />} />
                {/* <Route path={BASE_PATH + "/test"} element={<TestTab />} /> */}
            </Routes>
        </div>
    )
}

export default Tabs