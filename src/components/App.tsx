import React from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

import { SaveState } from "../lib/DB/saveState";
import Tabs from "./Tabs";
import { useAppStore } from "./UseAppStore";

SaveState.load();

export const ExternalLayout: React.FC = () => {
    const BASE_PATH = "/zzz-card-banner";
    const { sidebarState } = useAppStore();
    const style = `main-menu ` + (sidebarState ? 'w-[140px] gap-1 px-2' : 'w-0 px-0 pointer-events-none');

    const MenuButton = () => {
        const { sidebarState } = useAppStore();
        const showSidebar = useAppStore((state) => state.reverseSidebarState);
        const className = `size-10 m-1 active:animate-spin cursor-pointer bg-orange-700/30 rounded-xl`;

        return sidebarState ? (
            <FiX className={className} onClick={showSidebar} />
        ) : (
            <FiMenu className={className} onClick={showSidebar} />
        );
    }

    return (
        <div className="box-border min-w-screen h-screen rounded-md overflow-auto">
            {/* <div className="flex items-stretch flex-col rounded-md min-h-[calc(100dvh-12px)] min-w-full h-full w-full"> */}
            <div className="grid grid-cols-1 grid-rows-[48px_auto] min-w-max">
                <div className="flex items-center h-12 bg-linear-to-r from-amber-600 to-orange-950 rounded-t-md">
                    <MenuButton />
                    <span className='text-[34px] font-["paybooc"] text-stone-100 mx-4 left-2 sticky'>
                        Capi ZZZ Card Build
                    </span>
                </div>
                <div className="relative flex flex-row min-w-fit">
                    <aside className={style}>
                        <div className="h-fit sticky top-0">

                            <Link to={BASE_PATH + "/"} className="main-menu-button">Characters</Link>
                            <Link to={BASE_PATH + "/calc"} className="main-menu-button">
                                Rotation <sub className="text-[10px] text-red-500">alpha</sub>
                            </Link>
                            <Link to={BASE_PATH + "/import"} className="main-menu-button">Import</Link>
                            {/* <Link to={BASE_PATH + "/test"} className="main-menu-button">Test</Link> */}
                        </div>
                    </aside>
                    <Tabs />
                </div>
            </div>
        </div>
    )
}
