import React from "react";

function SearchBar({ onChange, onSubmit, query}) {   
    return (
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="Enter Song/Artist" onChange={onChange} value={query} />
            <input type="submit" value="Search" /> 
        </form>
    )  
}

export default SearchBar