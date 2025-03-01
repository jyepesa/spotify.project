import React from "react";
import Track from "./Track";

function TrackList({ playlist }) {
    return (
        <div>
            {playlist.map(track => {
                const { id, name, artist, album } = track
                return (
                <Track key={id} name={name} artist={artist} album={album}/>
            )})}
        </div>
    )
}
export default TrackList