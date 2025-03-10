import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import TrackList from "../components/TrackList";
import ErrorMessage from "../components/ErrorMessage";
import Playlist from "../components/Playlist";
import styles from "../styles/SearchLogic.module.css"

function SearchLogic({token}) {
    const [results, setResults] = useState([])
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)
    const [playlist, setPlaylist] = useState([])

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
                    name: track.name.length > 30 ? `${track.name.slice(0, 29)}...` : track.name,
                    artist: ((track.artists.map(artist => artist.name)).join(", ")).length > 40 ? `${(track.artists.map(artist => artist.name)).join(", ").slice(0, 39)}...` : (track.artists.map(artist => artist.name)).join(", "),
                    album: track.album.name
                })))
            } else {
                setResults([])
            }
        }).catch(err => {
            setError("Request not possible: ", err)
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
    const addToPlaylist = (song) => {
        setPlaylist(prev => {
            if(prev.some(s => s.id === song.id)) {
                return prev
            } else {
                return [...prev, song]
            }
        })
    }
    const removeSong = (song) => {
        setPlaylist(prev => prev.filter(s => s.id !== song.id))
    }
    return (
        <div>
            <SearchBar onSubmit={handleSubmit} onChange={handleChange} query={input}/>
            <ErrorMessage message={error} loading={loading}/>
            <div className={styles.lists}>
                <TrackList searchResults={results} addSongs={addToPlaylist}/>
                <Playlist playlist={playlist} remove={removeSong}/>
            </div>
        </div>
    )
}
export default SearchLogic