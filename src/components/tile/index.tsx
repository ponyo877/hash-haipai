import { FC } from "react";
import tileImage  from "./images";

interface TileProps {
    tile: string;
  }

const Tile: FC<TileProps> = ({tile}) => {
    const TileImage = tileImage(tile);
    return (
        <div
            className={
                'relative flex-1 opacity-50 transition'
            }
        >
            {TileImage !== null && (
                <TileImage className="absolute inset-0 scale-90" />
            )}
        </div>
    );
}

export default Tile;