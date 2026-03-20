import { ReactNode, useEffect, useRef, useState } from "react";

const ScrollBar = ({ children }: { children: ReactNode }) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const scrollTrackRef = useRef<HTMLDivElement>(null);
    const scrollThumbRef = useRef<HTMLDivElement>(null);
    const observer = useRef<ResizeObserver | null>(null);

    const [thumbHeight, setThumbHeight] = useState(20);
    const [isDragging, setIsDragging] = useState(false);
    const [scrollStartPosition, setScrollStartPosition] = useState<number>(0);
    const [initialContentScrollTop, setInitialContentScrollTop] = useState<number>(0);

    const thumbStyle = (height: number) => {
        return `absolute h-[${height}px] ${isDragging ? `cursor-grabbing` : `cursor-grab`}`;
    }

    const handleResize = () => {
        if (scrollTrackRef.current && contentRef.current) {
            const { clientHeight: trackSize } = scrollTrackRef.current;
            const { clientHeight: contentVisible, scrollHeight: contentTotalHeight } = contentRef.current;
            setThumbHeight(
                Math.max((contentVisible / contentTotalHeight) * trackSize, 20),
            );
        }
    }

    const handleThumpPositision = () => {
        if (
            !contentRef.current ||
            !scrollTrackRef.current ||
            !scrollThumbRef.current
        ) {
            return;
        }

        const { scrollTop: contentTop, scrollHeight: contentHeight } =
            contentRef.current;
        const { clientHeight: trackHeight } = scrollTrackRef.current;

        let newTop = (contentTop / contentHeight) * trackHeight;
        newTop = Math.min(newTop, trackHeight - thumbHeight);

        const thumb = scrollThumbRef.current;
        requestAnimationFrame(() => {
            thumb.style.top = `${newTop}px`;
        });
    }

    useEffect(() => {
        if (contentRef.current) {
            const content = contentRef.current;
            observer.current = new ResizeObserver(() => {
                handleResize();
            });
            observer.current.observe(content);
            content.addEventListener('scroll', handleThumpPositision);
            return () => {
                observer.current?.unobserve(content);
                content.removeEventListener('scroll', handleThumpPositision);
            }
        }

    }, []);



    const handleThumbMousedown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setScrollStartPosition(e.clientY);
        if (contentRef.current)
            setInitialContentScrollTop(contentRef.current.scrollTop);
        setIsDragging(true);
    }

    const handleThumbMouseup = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isDragging) {
            setIsDragging(false);
        }
    }

    const handleThumbMousemove = (e: MouseEvent) => {
        if (contentRef.current) {
            e.preventDefault();
            e.stopPropagation();
            if (isDragging) {
                const {
                    scrollHeight: contentScrollHeight,
                    clientHeight: contentClientHeight,
                } = contentRef.current;

                const deltaY =
                    (e.clientY - scrollStartPosition) *
                    (contentClientHeight / thumbHeight);

                const newScrollTop = Math.min(
                    initialContentScrollTop + deltaY,
                    contentScrollHeight - contentClientHeight
                );

                contentRef.current.scrollTop = newScrollTop;
            }
        }
    }

    useEffect(() => {
        document.addEventListener('mousemove', handleThumbMousemove);
        document.addEventListener('mouseup', handleThumbMouseup);
        return () => {
            document.removeEventListener('mousemove', handleThumbMousemove);
            document.removeEventListener('mouseup', handleThumbMouseup);
        };
    }, [handleThumbMousemove, handleThumbMouseup]);

    const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const { current: track } = scrollTrackRef;
        const { current: content } = contentRef;
        if (track && content) {
            const { clientY } = e;
            const target = e.target as HTMLDivElement;
            const rect = target.getBoundingClientRect();
            const trackTop = rect.top;
            const thumbOffset = -(thumbHeight / 2);
            const clickRatio =
                (clientY - trackTop + thumbOffset) / track.clientHeight;
            const scrollAmount = Math.floor(clickRatio * content.scrollHeight);
            content.scrollTo({
                top: scrollAmount,
                behavior: 'smooth',
            });
        }
    }

    return (
        <div className="relative overflow-hidden grid grid-rows-[auto] grid-cols-[1fr_50px] h-full ">
            <div ref={contentRef} className="overflow-auto scrollbar-none h-[90vh] p-[0_1rem] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {children}
            </div>
            <div role="scrollbar" className="grid g-4 grid-flow-row grid-rows-[auto_1fr_auto] grid-cols-[1fr] p-4 place-items-center">
                <div id="track-and-thumb" className="block h-full relative w-4">
                    <div ref={scrollTrackRef} id="track" onClick={handleTrackClick} className={`cursor-pointer absolute top-[0] bottom-[0] ` + isDragging ? `cursor-grabbing` : undefined}>

                    </div>
                    <div ref={scrollThumbRef} onMouseDown={handleThumbMousedown} id="thumb" className={thumbStyle(thumbHeight)}>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ScrollBar