import React from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { SaveState } from "../lib/DB/saveState";
import Tabs from "./Tabs";
import { useAppStore } from "./UseAppStore";

SaveState.load()

export const ExternalLayout: React.FC = () => {


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
        const BASE_PATH = "/zzz-card-banner";
        const { sidebarState } = useAppStore();
        let style = `side-menu-content `
        style += (sidebarState ? 'w-[140px] gap-1 px-2' : 'w-0');

        return (
            <div className="fixed top-0 left-0 z-40">
                <MenuButton />
                <nav className={style}>
                    <Link to={BASE_PATH + "/"} className="side-menu-button">Characters</Link>
                    <Link to={BASE_PATH + "/calc"} className="side-menu-button ">
                        Rotation <sub className="text-[10px] text-red-500">alpha</sub>
                    </Link>
                    <Link to={BASE_PATH + "/import"} className="side-menu-button">Import</Link>
                    {/* <Link to={BASE_PATH + "/test"} className="side-menu-button">Test</Link> */}
                </nav>
            </div>
        )
    }


    return (
        <div className="block bg-neutral-950 box-border min-w-full min-h-screen max-h-screen rounded-md overflow-auto scrollbar-thin">
            <div className="flex flex-col box-border rounded-md min-h-full min-w-fit w-full">
                <SideMenu />
                <div className="flex items-center h-12 min-w-full bg-gradient-to-r from-amber-600 to-orange-950 rounded-t-md ">
                    <span className='text-[34px] font-["paybooc"] text-stone-100 mx-4 sticky left-16'>
                        Capi ZZZ Card Build
                    </span>
                </div>
                <Tabs />
            </div>
        </div>
    )
}
