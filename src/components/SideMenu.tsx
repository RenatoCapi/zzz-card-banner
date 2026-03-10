import { Link } from "react-router-dom";
import { useAppStore } from "./UseAppStore";


type SideMenuProps = {
    show: boolean
}

const SideMenu = () => {
    const BASE_PATH = "/zzz-card-banner";
    const { sidebarState } = useAppStore();

    return (
        <div className={sidebarState ? 'side-menu-content w-[140px]' : 'side-menu-content w-0'}>
            <nav className="flex flex-col gap-1 p-2 w-full h-full">
                <Link to={BASE_PATH + "/"} className="side-menu-button">Characters</Link>
                <Link to={BASE_PATH + "/import"} className="side-menu-button">Import</Link>
                <Link to={BASE_PATH + "/calc"} className="side-menu-button">Calc</Link>
            </nav>
        </div>
    )
}

export default SideMenu