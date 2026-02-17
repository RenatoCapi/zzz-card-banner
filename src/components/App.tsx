import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { SaveState } from "../lib/DB/saveState";
import Tabs from "./Tabs";

SaveState.load()

export const ExternalLayout: React.FC = () => {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => {
        setSidebar(!sidebar);
    };

    const MenuButton = () => {
        return sidebar ? (
            <FiX className={`size-14 p-2 mx-2 active:animate-spin cursor-pointer`} onClick={showSidebar} />
        ) : (
            <FiMenu className={`size-14 p-2 mx-2 active:animate-spin cursor-pointer`} onClick={showSidebar} />
        );
    }
    return (
        <div className="flex bg-neutral-950 box-border items-stretch min-w-full min-h-screen max-h-screen rounded-md overflow-x-scroll overflow-y-scroll scrollbar-thin">
            <div className="flex flex-col box-border rounded-md min-h-full min-w-fit w-full">
                <div className="flex items-center h-[60px] min-w-full bg-gradient-to-r from-amber-600 to-orange-950 rounded-t-md ">
                    <MenuButton />
                    <span className='block text-[38px] font-["paybooc"] text-stone-100 mx-4'>
                        Capi ZZZ Card Build
                    </span>
                </div>
                <Tabs show={sidebar} />
            </div>
        </div>
    )
}
