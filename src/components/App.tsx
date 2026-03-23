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
    const style = `relative main-menu ` + (sidebarState ? 'w-[140px] gap-1 px-2' : 'w-0 px-0 pointer-events-none');

    const MenuButton = () => {
        const { sidebarState } = useAppStore();
        const showSidebar = useAppStore((state) => state.reverseSidebarState);
        const style = `size-10 mx-2 my-1 active:animate-spin cursor-pointer bg-orange-700/30 rounded-xl`;

        return sidebarState ? (
            <FiX className={style} onClick={showSidebar} />
        ) : (
            <FiMenu className={style} onClick={showSidebar} />
        );
    }

    const SideMenu = () => {




        return (
            <div className="fixed top-0 left-0 z-40 size-0">
                <MenuButton />

            </div>
        )
    }


    return (
        <div className="block box-border min-w-full min-h-screen max-h-screen rounded-md overflow-auto">
            <div className="flex flex-col rounded-md min-h-[calc(100dvh-12px)] min-w-fit h-full w-full">
                <div className="flex items-center h-12 min-w-full bg-linear-to-r from-amber-600 to-orange-950 rounded-t-md ">
                    <span className='text-[34px] font-["paybooc"] text-stone-100 mx-4 sticky left-16'>
                        Capi ZZZ Card Build
                    </span>
                </div>
                <SideMenu />
                <div className="flex flex-row">
                    <nav className={style}>
                        <Link to={BASE_PATH + "/"} className="main-menu-button">Characters</Link>
                        <Link to={BASE_PATH + "/calc"} className="main-menu-button">
                            Rotation <sub className="text-[10px] text-red-500">alpha</sub>
                        </Link>
                        <Link to={BASE_PATH + "/import"} className="main-menu-button">Import</Link>
                        {/* <Link to={BASE_PATH + "/test"} className="main-menu-button">Test</Link> */}
                    </nav>
                    <Tabs />
                </div>
            </div>
        </div>
    )
}
