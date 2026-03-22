type TooltipBoxProps = {
    msg: string
    active: boolean
}

const TooltipBox = ({ msg, active }: TooltipBoxProps) => {
    return (
        <div className={`absolute bg-stone-200 rounded-lg p-1 py-2 z-50 justify-center w-[100px] h-[100px] -top-[150%] left-[50%] -translate-x-1/2 duration-1000 ${active ? 'opacity-100' : 'opacity-0'}`}>
            <span className="text-stone-900">
                {msg}
            </span>
        </div>
    );
}

export default TooltipBox