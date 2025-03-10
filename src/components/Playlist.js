import React from "react";
import Track from "./Track";
import styles from "../styles/Playlist.module.css"

function Playlist({playlist, remove}) {
    return (    
        <div className={styles.playlist}>
            {playlist.map(track => {
                const { id, name, artist, album } = track
                return (
                <Track key={id} name={name} artist={artist} album={album}>
                    <button className={styles.remove} onClick={() => remove(track)}>-</button>
                </Track>
            )})}
        </div>
    )
}

export default Playlist