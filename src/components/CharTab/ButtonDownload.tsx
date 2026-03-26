import { domToPng } from 'modern-screenshot';
import { RefObject, useState } from "react";
import TooltipBox from "../TooltipBox";

const ButtonDownload = (props: { refDiv: RefObject<HTMLDivElement | null>, charName: string }) => {
    const { refDiv, charName } = props;

    const [msg, setMsg] = useState("");
    const [active, setActive] = useState(false);

    const blinkTooltip = () => {
        setActive((prev) => !prev)
        setTimeout(() => {
            setActive((prev) => !prev);
        }, 2000);
    };

    const exportAsImage = async (element: RefObject<HTMLDivElement | null> | null, imageFileName: string) => {
        if (!element?.current) {
            setMsg("Download Error!");
            blinkTooltip();
            return;
        }

        const canvas = await domToPng(element.current);
        downloadImage(canvas, imageFileName);

    };

    const downloadImage = (blob: string, fileName: string) => {
        const fakeLink = window.document.createElement("a");
        fakeLink.style = "display:none;";
        fakeLink.download = fileName;

        fakeLink.href = blob;

        document.body.appendChild(fakeLink);
        fakeLink.click();
        document.body.removeChild(fakeLink);
        fakeLink.remove();

        setMsg("Downloaded!");
        blinkTooltip();
    };

    // const png_download = async () => {
    //     if (current === null) {
    //         setMsg("Download Error!");
    //         return;
    //     }

    //     toPng(current, { cacheBust: false })
    //         .then(async (dataUrl) => {
    //             const link = document.createElement("a");
    //             link.download = props.charName + ".png";
    //             link.href = dataUrl;
    //             link.click();
    //             setMsg("Downloaded!");

    //         })
    //         .catch((err) => {
    //             setMsg("Download Error!");
    //             console.log(err);
    //         });

    //     blinkTooltip();
    // };

    return (
        <div className="flex relative w-auto items-center z-50 my-4">
            <button type="button" onClick={() => exportAsImage(refDiv, charName)} className="py-1 px-2 button-base">
                <TooltipBox msg={msg} active={active} />
                Download
            </button>
        </div>
    )
}



export default ButtonDownload
