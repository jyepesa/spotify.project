import React, { useState } from "react";
function SearchBar(props) {
    const [ input, setInput ] = useState("")
    const handleChange = (e) => {
        setInput(e.target.value)  
    }
    const handleSubmit = (e) => {
        e.preventDefault();   
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter Song/Artist" onChange={handleChange} value={input} />
            <input type="submit" value="Search" /> 
        </form>
    )  
}

export default SearchBar