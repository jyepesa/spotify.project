import React, { useState } from "react";
import songs from "../mockDataSongs";
import SearchBar from "../components/SearchBar";
import TrackList from "../components/TrackList";

function SearchLogic({token}) {
    const [results, setResults] = useState([])
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const handleSearch = (searchTerm) => {
        if(!searchTerm) {
            setResults([])
            return
        }
        setLoading(true)
        fetch(`https://api.spotify.com/v1/search?q=$${encodeURIComponent(searchTerm)}&type=track`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(res => {
            if(!res.ok) {
                setError("It was not possible to get the data")
            } return res.json()           
        }).then(data => {
            setLoading(false)
            console.log(data)
            if(data.tracks && data.tracks.items) {
                setResults(data.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: (track.artists.map(artist => artist.name)).join(", "),
                    album: track.album.name
                })))
            } else {
                setResults([])
            }
        })
        

        
    }
    const handleChange = (e) => {
        setInput(e.target.value)  
    }
    const handleSubmit = (e) => {
        e.preventDefault();   
        handleSearch(input)
        setInput("")
    }
    /*
            */
    return (
        <div>
            <SearchBar onSubmit={handleSubmit} onChange={handleChange} query={input}/>
            <TrackList playlist={results}/>
        </div>
    )
}
export default SearchLogic