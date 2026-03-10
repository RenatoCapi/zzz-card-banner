import { Route, Routes } from "react-router-dom"
import CalcTab from "./BuildCalcTab/CalcTab"
import CharTab from "./CharTab/CharTab"
import ImportTab from "./ImportTab/ImportTab"
import SideMenu from "./SideMenu"

type TabsProps = {
    show: boolean
}

const Tabs = () => {
    const BASE_PATH = "/zzz-card-banner"
    return (
        <div className="flex flex-row box-border self-stretch min-h-fit min-w-fit">
            <SideMenu />
            <Routes>
                <Route path={BASE_PATH + "/"} element={<CharTab />} />
                <Route path={BASE_PATH + "/import"} element={<ImportTab />} />
                <Route path={BASE_PATH + "/calc"} element={<CalcTab />} />
            </Routes>
        </div>
    )
}

export default Tabs