import { toPng } from "html-to-image";
import { RefObject, useState } from "react";
import TooltipBox from "../TooltipBox";

const ButtonToPng = (props: { refDiv: (RefObject<HTMLDivElement | null> | null) }) => {
    const { refDiv } = props;
    const current = refDiv ? refDiv.current : null;

    const [msg, setMsg] = useState("");
    const [active, setActive] = useState(false);

    const blinkTooltip = () => {
        setActive((prev) => !prev)
        setTimeout(() => {
            setActive((prev) => !prev);
        }, 2000);
    };

    const png_clipboard = () => {
        if (current === null) {
            return
        }

        toPng(current, { cacheBust: false })
            .then(async (dataUrl) => {
                const data = await fetch(dataUrl)
                const blob = await data.blob()
                navigator.clipboard.write([
                    new ClipboardItem({
                        [blob.type]: blob,
                    }),
                ])
                setMsg("Copied!")
                blinkTooltip();
            })
            .catch((err) => {
                setMsg("Failed to copy!")
                blinkTooltip();
                console.log(err)
            });
    }


    return (
        <div className="flex relative w-auto items-center z-50 my-4">
            <button type="button" onClick={png_clipboard} className="py-1 px-2 button-base">
                <TooltipBox msg={msg} active={active} />
                Copy to Clipboard
            </button>
        </div>
    )
}

export default ButtonToPng