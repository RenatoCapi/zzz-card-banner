import { Route, Routes } from "react-router-dom"
import CharTab from "./CharTab/CharTab"
import ImportTab from "./ImportTab/ImportTab"
import RotationTab from "./RotationTab/RotationTab"

const Tabs = () => {
    const BASE_PATH = "/zzz-card-banner"
    return (
        <div className="flex flex-row min-h-fit min-w-fit w-full">
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