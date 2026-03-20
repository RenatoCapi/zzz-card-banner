import { Link, Route, Routes } from "react-router-dom"
import CharTab from "./CharTab/CharTab"
import ImportTab from "./ImportTab/ImportTab"
import RotationTab from "./RotationTab/RotationTab"
import { useAppStore } from "./UseAppStore"


const SideMenu = () => {
    const BASE_PATH = "/zzz-card-banner";
    const { sidebarState } = useAppStore();
    let style = `sticky side-menu-content `
    style += (sidebarState ? 'w-[140px] gap-1 px-2' : 'w-0');

    return (
        <nav className={style}>
            <Link to={BASE_PATH + "/"} className="side-menu-button">Characters</Link>
            <Link to={BASE_PATH + "/import"} className="side-menu-button">Import</Link>
            <Link to={BASE_PATH + "/calc"} className="side-menu-button">Calc</Link>
            {/* <Link to={BASE_PATH + "/test"} className="side-menu-button">Test</Link> */}
        </nav>
    )
}

const Tabs = () => {
    const BASE_PATH = "/zzz-card-banner"
    return (
        <div className="flex flex-row box-border self-stretch min-h-fit min-w-fit">
            {/* <SideMenu /> */}
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