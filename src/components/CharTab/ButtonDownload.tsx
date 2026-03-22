import { toPng } from "html-to-image";
import { RefObject, useState } from "react";
import TooltipBox from "../TooltipBox";

const ButtonDownload = (props: { refDiv: RefObject<HTMLDivElement | null>, charName: string }) => {
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

    const png_download = () => {
        if (current === null) {
            setMsg("Download Error!");
            return;
        }

        toPng(current, { cacheBust: false })
            .then(async (dataUrl) => {
                const link = document.createElement("a");
                link.download = props.charName + ".png";
                link.href = dataUrl;
                link.click();
                setMsg("Downloaded!");

            })
            .catch((err) => {
                setMsg("Download Error!");
                console.log(err);
            });

        blinkTooltip();
    };

    return (
        <div className="flex relative w-auto items-center z-50 my-4">
            <button type="button" onClick={png_download} className="py-1 px-2 button-base">
                <TooltipBox msg={msg} active={active} />
                Download
            </button>
        </div>
    )
}



export default ButtonDownload