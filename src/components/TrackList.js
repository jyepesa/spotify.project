import React from "react";
import Track from "./Track";
import styles from "../styles/TrackList.module.css"

function TrackList({ searchResults, addSongs }) {
    return (
        <div className={styles.tracklist}>
            {searchResults.map(track => {
                const { id, name, artist, album } = track
                return (
                <Track key={id} name={name} artist={artist} album={album}>
                    <button className={styles.add} onClick={() => addSongs(track)}>+</button>
                </Track>
            )})}
        </div>
    )
}
export default TrackList