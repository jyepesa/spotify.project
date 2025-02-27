import React from "react";
function Track(props) {
    return (
        <div key={props.id}>          
            <h2>{props.name}</h2>
            <p>{props.artist}</p>         
            <p>{props.album}</p> 
        </div>
    )
}
export default Track