import React from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { SaveState } from "../lib/DB/saveState";
import Tabs from "./Tabs";
import { useAppStore } from "./UseAppStore";

SaveState.load()

export const ExternalLayout: React.FC = () => {


    const MenuButton = () => {
        const { sidebarState } = useAppStore();
        const showSidebar = useAppStore((state) => state.reverseSidebarState)
        return sidebarState ? (
            <FiX className={`size-14 p-2 mx-2 active:animate-spin cursor-pointer`} onClick={showSidebar} />
        ) : (
            <FiMenu className={`size-14 p-2 mx-2 active:animate-spin cursor-pointer`} onClick={showSidebar} />
        );
    }


    return (
        <div className="block bg-neutral-950 box-border min-w-full min-h-screen max-h-screen rounded-md overflow-x-scroll overflow-y-scroll scrollbar-thin">
            <div className="flex flex-col box-border rounded-md min-h-full min-w-fit w-full">
                <div className="flex items-center h-[56px] min-w-full bg-gradient-to-r from-amber-600 to-orange-950 rounded-t-md ">
                    <MenuButton />
                    <span className='block text-[38px] font-["paybooc"] text-stone-100 mx-4'>
                        Capi ZZZ Card Build
                    </span>
                </div>
                <Tabs />
            </div>
        </div>
    )
}
