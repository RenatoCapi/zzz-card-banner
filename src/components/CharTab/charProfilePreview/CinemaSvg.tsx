import { MOVIE_MAPPING, circle } from "../../../lib/constantsUI";


export const CinemaPreview = ({ charMovie }: { charMovie: number }) => {
    return (
        <div className="flex flex-col absolute bottom-0 left-0 w-10.5 items-end gap-4 justify-end z-30">
            {Object.entries(MOVIE_MAPPING).map(([id, value], index_jsx) =>
                <MoviePreview id={+id} value={value} movie={charMovie} key={index_jsx} />
            )}
        </div>
    )
}

const MoviePreview = (props: { id: number, value: string, movie: number }) => {
    const { id, value, movie } = props;
    const color = (movie >= id) ? "fill-cinema-on" : "fill-cinema-off";
    return (
        <svg viewBox="0 0 80 80" className={`w-10.5 h-10.5 ${color} drop-shadow-primary`}>
            <path d={value} />
            <path d={circle} />
        </svg>
    )
}