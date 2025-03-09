import React from "react";
function Track(props) {
    return (
        <div id={props.id}>          
            <h2>{props.name}</h2>
            <p>{props.artist}</p>         
            <p>{props.album}</p> 
        </div>
    )
}
export default Track