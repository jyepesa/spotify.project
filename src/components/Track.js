import React from "react";
import styles from "../styles/Track.module.css"

function Track(props) {
    return (
        <div id={props.id} className={styles.track}>          
            <div className={styles.info}>
                <h2>{props.name}</h2>
                <p className={styles.artist}>{props.artist}</p>
                <br></br>      
                <p className={styles.album}>{props.album}</p> 
            </div>
            {props.children}
        </div>
    )
}
export default Track