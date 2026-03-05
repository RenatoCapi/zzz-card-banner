import { Link } from "react-router-dom";


type SideMenuProps = {
    show: boolean
}

const SideMenu = ({ show }: SideMenuProps) => {
    const BASE_PATH = "/zzz-card-banner";

    return (
        <div className={show ? 'side-menu-content w-[140px]' : 'side-menu-content w-0'}>
            <div className="flex flex-col gap-1 p-2 w-full h-full">
                <Link to={BASE_PATH + "/"} className="side-menu-button">Characters</Link>
                <Link to={BASE_PATH + "/import"} className="side-menu-button">Import</Link>
                <Link to={BASE_PATH + "/calc"} className="side-menu-button">Calc</Link>
            </div>
        </div>
    )
}

export default SideMenu