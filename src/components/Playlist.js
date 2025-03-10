import React from "react";
import Track from "./Track";
import styles from "../styles/Playlist.module.css"

function Playlist({playlist, remove, name, input, onChange, nameChange}) {
    return (    
        <div className={playlist.length === 0 ? styles.invisible : styles.playlist}>
            <h1>{playlist.length === 0 ? "" : `${name} Playlist`}</h1>
            <input type="text" value={input} onChange={onChange} placeholder="Enter Playlist name" className={styles.nameInput}/>
            <button onClick={() => nameChange(input)} >Name it!</button>
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