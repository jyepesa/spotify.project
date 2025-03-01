import React, { useState } from "react";
import songs from "../mockDataSongs";
import SearchBar from "../components/SearchBar";
import TrackList from "../components/TrackList";

function SearchLogic() {
    const [results, setResults] = useState([])
    const handleSearch = (searchTerm) => {
        if(!searchTerm) {
            setResults([])
            return
        }
        const filteredResults = songs.filter(track => {
            const songLower = searchTerm.toLowerCase();
            return (track.name.toLowerCase().includes(songLower) || track.artist.toLowerCase().includes(songLower))
        })
        setResults(filteredResults)
    }
    return (
        <div>
            <SearchBar onSearch={handleSearch}/>
            <TrackList playlist={results}/>
        </div>
    )
}
export default SearchLogic